import Papa from "papaparse";
import fs from "fs";
import { User } from "@/types/user";
import { config } from "./config";

const loadCsv = (filepath: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    try {
      const csvString = fs.readFileSync(filepath, "utf8");

      Papa.parse(csvString, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          resolve(results.data as User[]);
        },
        error: (error: any) => {
          console.error(`Error parsing '${filepath}':`, error);
          reject(error);
        },
      });
    } catch (err) {
      console.error(`Error reading '${filepath}':`, err);
      reject(err);
    }
  });
};

export const studentData: Promise<User[]> = loadCsv(config.studentDataFile);
export const taData: Promise<User[]> = loadCsv(config.taDataFile);
export const nameData: Promise<Array<{ Name: string }>> = loadCsv(
  config.nameDataFile,
);
