import { db } from "@/config/db";
import { logClock } from "./log";

export const getTas = async (): Promise<Array<{ gtid: string }>> => {
  const query = `SELECT (gtid) FROM tas`;
  try {
    const stmt = db.prepare(query);
    const result = stmt.all() as Array<{ gtid: string }>;
    return result;
  } catch (err: any) {
    console.error("Error getting queue:", err);
    throw err;
  }
};

export const taOnDuty = async (gtid: string) => {
  const query = `SELECT * FROM tas WHERE gtid = ? LIMIT 1`;
  try {
    const stmt = db.prepare(query);
    const result = stmt.get(gtid);
    return result !== undefined;
  } catch (err: any) {
    console.error("Error checking if TA is on duty:", err);
    throw err;
  }
};

export const addTa = async (gtid: string) => {
  const query = `INSERT INTO tas (gtid) VALUES (?)`;
  try {
    db.exec("BEGIN TRANSACTION");

    const stmt = db.prepare(query);
    stmt.run(gtid);

    logClock(gtid, "IN");
    const taGtids = await getTas();

    db.exec("COMMIT");
    return taGtids;
  } catch (err: any) {
    db.exec("ROLLBACK");
    console.error("Error adding TA:", err);
    throw err;
  }
};

export const removeTa = async (gtid: string) => {
  const query = `DELETE FROM tas WHERE gtid = ?`;
  try {
    db.exec("BEGIN TRANSACTION");

    const stmt = db.prepare(query);
    stmt.run(gtid);

    logClock(gtid, "OUT");
    db.exec("COMMIT");
  } catch (err) {
    db.exec("ROLLBACK");
    console.error("Error removing TA:", err);
    throw err;
  }
};
