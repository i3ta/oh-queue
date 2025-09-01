import { Pool } from "pg";
import { config } from "./config";

export const pool = new Pool({
  user: config.dbUser,
  password: config.dbPass,
  host: config.dbHost,
  port: config.dbPort,
  database: config.dbName,
});

pool
  .connect()
  .then((client) => {
    console.log("Connected to PostgreSQL");
    client.release();
  })
  .catch((err) => {
    console.error("Postgres connection error:", err);
  });
