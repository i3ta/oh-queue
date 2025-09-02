import axios from "axios";

export const healthcheck = async () => {
  try {
    await axios.get("/api/health");
    return true;
  } catch (err: any) {
    return false;
  }
};
