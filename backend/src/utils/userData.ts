import { nameData, studentData, taData } from "@/config/data";
import { randomInt } from "crypto";
import { getQueue } from "./queue";

export const getStudent = async (gtid: string) => {
  const students = await studentData;
  return students.find((user) => user.gtid === gtid);
};

export const getTA = async (gtid: string) => {
  const tas = await taData;
  return tas.find((user) => user.gtid === gtid);
};

export const getRandomName = async () => {
  const queue = await getQueue(1000); // 1000 for no limit
  const usedNames: string[] = queue.map((e) => e.name);

  const names = await nameData;
  let newName: string;
  do {
    newName = names[randomInt(names.length)].Name;
  } while (newName && usedNames.find((e) => e === newName) !== undefined);

  return newName;
};
