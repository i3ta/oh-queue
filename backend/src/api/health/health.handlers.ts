import { Request, Response } from "express";

export const getHealthy = (_req: Request, res: Response) => {
  res.status(200).json({ message: "The server has been eating apples 🍎!" });
  return;
};
