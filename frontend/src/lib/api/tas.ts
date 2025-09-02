import axios from "axios";

export const getTAs = async (): Promise<string[]> => {
  try {
    const { data } = await axios.get("/api/tas");
    return data.map((ta: any) => ta.name);
  } catch (err: any) {
    console.error("There was an error getting TAs:", err);
    return [];
  }
};
