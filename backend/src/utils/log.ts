import { db } from "@/config/db";
import { insertLogs } from "./sheets";
import { LogEntry } from "@/types/logEntry";

export const logClock = (gtid: string, action: "IN" | "OUT") => {
  const logQuery = `
    INSERT INTO log_cache (action, gtid)
    VALUES (?, ?)
  `;

  const logStmt = db.prepare(logQuery);
  logStmt.run(action === "IN" ? "clock_in" : "clock_out", gtid);
};

export const logEnqueue = (gtid: string, name: string) => {
  const logQuery = `
    INSERT INTO log_cache (action, gtid, name)  
    VALUES ('enqueue', ?, ?)
  `;

  const logStmt = db.prepare(logQuery);
  logStmt.run(gtid, name);
};

export const logDequeue = (taId: string, studentId: string) => {
  const logQuery = `
    INSERT INTO log_cache (action, gtid, student_gtid)
    VALUES ('dequeue', ?, ?)
  `;

  const logStmt = db.prepare(logQuery);
  logStmt.run(taId, studentId);
};

export const logUpdateName = (gtid: string, name: string) => {
  const logQuery = `
    UPDATE log_cache
    SET name = ?
    WHERE gtid = ?
    ORDER BY id DESC
    LIMIT 1
  `;

  const logStmt = db.prepare(logQuery);
  logStmt.run(name, gtid);
};

export const updateRemote = async () => {
  const logQuery = `SELECT * FROM log_cache`;

  try {
    const stmt = db.prepare(logQuery);
    const result = stmt.all() as LogEntry[];

    if (result.length === 0) {
      console.log("Sync skipped: No logs in local cache.");
      return;
    }

    const data = result.map((row) => [
      row.timestamp,
      row.action,
      row.gtid,
      row.student_gtid,
      row.name,
    ]);

    await insertLogs(data);

    db.prepare(`DELETE FROM log_cache`).run();
    console.log(`Successfully synced and cleared ${result.length} logs.`);
  } catch (err: any) {
    console.error(`FAILED to sync logs to Google Sheets.`);
    console.error(`Reason: ${err.message || "Unknown error"}`);
    console.error(`Local logs have been preserved in log_cache.`);
  }
};
