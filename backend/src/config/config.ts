import dotenv from "dotenv";
dotenv.config();

interface Config {
  port: number;
  dbUser: string;
  dbPass: string;
  dbName: string;
  dbHost: string;
  dbPort: number;
}

export const config: Config = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 4000,
  dbUser: process.env.DB_USER ?? "user",
  dbPass: process.env.DB_PASS ?? "password",
  dbName: process.env.DB_NAME ?? "name",
  dbHost: process.env.DB_HOST ?? "postgres",
  dbPort: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
};
