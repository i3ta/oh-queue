import dotenv from "dotenv";
dotenv.config();

interface Config {
  port: number;
  dbPath: string;
  studentDataFile: string;
  taDataFile: string;
  nameDataFile: string;
}

export const config: Config = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 4000,
  dbPath: process.env.DB_USER ?? "db/data.sqlite",
  studentDataFile: process.env.STUDENT_DATA ?? "data/student.csv",
  taDataFile: process.env.TA_DATA ?? "data/ta.csv",
  nameDataFile: process.env.NAME_DATA ?? "data/foods.csv",
};
