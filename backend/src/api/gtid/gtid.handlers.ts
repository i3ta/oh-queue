import { isGTID } from "@/utils/gtid";
import { getStudent, getTA } from "@/utils/userData";
import { Request, Response } from "express";

export const getType = async (req: Request, res: Response) => {
  try {
    const gtid = req.query.gtid;
    if (!gtid || typeof gtid !== "string" || !isGTID(gtid)) {
      res.status(403).json({ message: "GTID not found or not a valid GTID." });
      return;
    }

    if (await getStudent(gtid)) {
      res.status(200).json({ type: "student" });
      return;
    } else if (await getTA(gtid)) {
      res.status(200).json({ type: "ta" });
      return;
    } else {
      res.status(404).json({ message: "GTID is not a student or a TA" });
    }
  } catch (err: any) {
    console.error("There was an error getting the user type:", err);
    res
      .status(500)
      .json({ message: "There was an error getting the user type" });
    return;
  }
};
