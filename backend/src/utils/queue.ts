import { db } from "@/config/db";
import { QueueItem } from "@/types/queueItem";

export const getQueueFromGTID = async (
  gtid: string,
): Promise<QueueItem | null> => {
  const query = `SELECT * FROM queue WHERE gtid = ? LIMIT 1`;
  try {
    const stmt = db.prepare(query);
    const result = stmt.get(gtid);
    return result ? (result as QueueItem) : null;
  } catch (err: any) {
    console.error("Error checking queue:", err);
    throw err;
  }
};

export const enqueueUser = async (gtid: string, name: string) => {
  const query = `INSERT INTO queue (gtid, name) VALUES (?, ?)`;
  try {
    const stmt = db.prepare(query);
    stmt.run(gtid, name);
  } catch (err: any) {
    console.error("Error enqueuing user:", err);
    throw err;
  }
};

export const updateName = async (gtid: string, name: string) => {
  const query = `UPDATE queue SET name = ? WHERE gtid = ?`;
  try {
    const stmt = db.prepare(query);
    stmt.run(name, gtid);
  } catch (err: any) {
    console.error("Error updating name in queue:", err);
    throw err;
  }
};

export const getQueueLength = async (): Promise<number> => {
  const query = `SELECT COUNT(*) as count FROM queue`;
  try {
    const stmt = db.prepare(query);
    const result = stmt.get() as { count: number };
    return result.count;
  } catch (err) {
    console.error("Error getting queue length:", err);
    throw err;
  }
};

export const getQueue = async (length: number = 3): Promise<QueueItem[]> => {
  const query = `SELECT * FROM queue LIMIT ${length}`;
  try {
    const stmt = db.prepare(query);
    const result = stmt.all() as QueueItem[];
    return result;
  } catch (err: any) {
    console.error("Error getting queue:", err);
    throw err;
  }
};

export const dequeueUser = async (): Promise<QueueItem | null> => {
  const query = `
    DELETE FROM queue
    WHERE id = (
      SELECT id FROM queue
      ORDER BY id ASC
      LIMIT 1
    )
    RETURNING gtid, name;
  `;
  try {
    const stmt = db.prepare(query);
    const result = stmt.get();
    return result ? (result as QueueItem) : null;
  } catch (err) {
    console.error("Error dequeuing:", err);
    throw err;
  }
};
