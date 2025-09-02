import { nameData, studentData, taData } from "@/config/data";
import { randomInt } from "crypto";

export const getStudent = async (gtid: string) => {
  const students = await studentData;
  return students.find((user) => user.gtid === gtid);
};

export const getTA = async (gtid: string) => {
  const tas = await taData;
  return tas.find((user) => user.gtid === gtid);
};

export const getRandomName = async () => {
  const names = await nameData;
  return names[randomInt(names.length)].Name;
};
