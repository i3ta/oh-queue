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
  CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      gtid TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      enqueued_times INTEGER NOT NULL,
      CHECK (gtid GLOB '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]')
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS queue_stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL UNIQUE,
      enqueue_times INTEGER NOT NULL
  );
`);

export { db };
