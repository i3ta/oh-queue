import Database from "better-sqlite3";
import { config } from "./config";

const db = new Database(config.dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS queue (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      gtid TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      CHECK (gtid GLOB '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]')
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS tas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      gtid TEXT NOT NULL UNIQUE,
      CHECK (gtid GLOB '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]')
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS log_cache (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      action TEXT NOT NULL CHECK (action IN ('clock_in', 'clock_out', 'enqueue', 'dequeue')),
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      gtid TEXT NOT NULL,
      name TEXT,
      student_gtid TEXT,
      CHECK (gtid GLOB '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]')
  );
`);

export { db };
