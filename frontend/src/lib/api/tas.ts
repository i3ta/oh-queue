import type { User } from "@/types/user";
import axios from "axios";

export const getTAs = async (): Promise<User[]> => {
  try {
    const { data } = await axios.get("/api/tas");
    return data.data;
  } catch (err: any) {
    console.error("There was an error getting TAs:", err);
    return [];
  }
};

export const addTA = async (gtid: string): Promise<User[]> => {
  try {
    const { data } = await axios.post("/api/tas", { gtid: gtid });
    return data.data;
  } catch (err: any) {
    console.error("There was an error adding the TA:", err);
    return [];
  }
};

export const removeTA = async (gtid: string) => {
  try {
    await axios.delete("/api/tas", { data: { gtid: gtid } });
  } catch (err: any) {
    console.error("There was an error adding the TA:", err);
  }
};
