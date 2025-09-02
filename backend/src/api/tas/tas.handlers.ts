import { isGTID } from "@/utils/gtid";
import { addTa, getTas, removeTa, taOnDuty } from "@/utils/tas";
import { getTA } from "@/utils/userData";
import { Request, Response } from "express";

export const handleGetTas = async (_req: Request, res: Response) => {
  try {
    const taGtids = await getTas();
    const tas = await Promise.all(taGtids.map((user) => getTA(user.gtid)));
    res.status(200).json({ data: tas });
    return;
  } catch (err: any) {
    console.error("There was an error getting TAs:", err);
    res.status(500).json({ message: "There was an error getting TAs" });
    return;
  }
};

export const handleAddTa = async (req: Request, res: Response) => {
  try {
    const gtid = req.body.gtid;

    if (!gtid || !isGTID(gtid) || !(await getTA(gtid))) {
      res.status(400).json({ message: "User is not a TA" });
      return;
    }
    if (await taOnDuty(gtid)) {
      res.status(409).json({ message: "TA is already on duty" });
      return;
    }

    const taGtids = await addTa(gtid);
    const tas = await Promise.all(taGtids.map((user) => getTA(user.gtid)));
    res.status(201).json({ data: tas });
    return;
  } catch (err: any) {
    console.error("There was an error adding the TA:", err);
    res.status(500).json({ message: "There was an error adding the TA" });
    return;
  }
};

export const handleRemoveTa = async (req: Request, res: Response) => {
  try {
    const gtid = req.body.gtid;

    if (!gtid || !isGTID(gtid) || !(await getTA(gtid))) {
      res.status(400).json({ message: "User is not a TA" });
      return;
    }
    if (!(await taOnDuty(gtid))) {
      res.status(409).json({ message: "TA is already on duty" });
      return;
    }

    await removeTa(gtid);
    res.status(204).json({ message: "The TA was taken off the On Duty list" });
    return;
  } catch (err: any) {
    console.error("There was an error removing the TA:", err);
    res.status(500).json({ message: "There was an error removing the TA" });
    return;
  }
};
