import { pool } from "@/config/db";
import { Request, Response } from "express";

export const getHealthy = (_req: Request, res: Response) => {
  res.status(200).json({ message: "The server has been eating apples 🍎!" });
  return;
};

export const getDbHealthy = async (_req: Request, res: Response) => {
  try {
    await pool.query("SELECT 1");

    res
      .status(200)
      .json({ message: "The database has been eating apples 🍎!" });
    return;
  } catch (err) {
    console.error("");
  }
};
