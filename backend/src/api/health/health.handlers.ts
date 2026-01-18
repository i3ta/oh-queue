import { sheetsHealthcheck } from "@/utils/sheets";
import { Request, Response } from "express";

export const getHealthy = (_req: Request, res: Response) => {
  res.status(200).json({ message: "The server has been eating apples 🍎!" });
  return;
};

export const getSheetsHealthy = async (_req: Request, res: Response) => {
  const connected = await sheetsHealthcheck();
  if (connected) {
    res.status(200).json({ message: "Connected to sheets API 📝!" });
    return;
  } else {
    res
      .status(500)
      .json({ message: "There was an error connecting to the sheets API..." });
    return;
  }
};
