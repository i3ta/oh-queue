import axios from "axios";

export const getQueue = async (): Promise<{
  length: number;
  data: Array<{ gtid: string; name: string }>;
}> => {
  try {
    const res = await axios.get("/api/queue");
    return res.data;
  } catch (err: any) {
    console.error("There was an error getting queue length:", err);
    return { length: -1, data: [] };
  }
};

export const getUserType = async (gtid: string) => {
  try {
    const res = await axios.get(`/api/gtid/type?gtid=${gtid}`);
    return res.data.type;
  } catch (err: any) {
    return null;
  }
};

export const enqueueUser = async (gtid: string) => {
  try {
    const res = await axios.post("/api/queue", { gtid: gtid });
    return { type: res.status === 200 ? "exists" : "new", name: res.data.name };
  } catch (err: any) {
    console.error("There was an error enqueuing user:", err);
    return { type: "error", name: null };
  }
};

export const dequeueUser = async () => {
  try {
    const res = await axios.delete("/api/queue");
    return res.data.name;
  } catch (err: any) {
    console.error("There was an error dequeuing user:", err);
    return null;
  }
};
