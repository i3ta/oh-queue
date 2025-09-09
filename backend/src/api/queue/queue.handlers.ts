import { isGTID } from "@/utils/gtid";
import {
  dequeueUser,
  enqueueUser,
  getQueue,
  getQueueFromGTID,
  getQueueLength,
  updateName,
} from "@/utils/queue";
import { getRandomName, getStudent } from "@/utils/userData";
import { Request, Response } from "express";

export const enqueueHandler = async (req: Request, res: Response) => {
  try {
    // Get GTID
    const gtid = req.body.gtid;

    // Ensure GTID is valid
    if (!gtid || !isGTID(gtid)) {
      res.status(403).json({ message: "GTID not found or not a valid GTID." });
    }

    // Get user info from csv
    const user = await getStudent(gtid);
    if (!user) {
      res.status(404).json({ message: "GTID not found in students list" });
    }

    // Check if user is already in queue
    const queueUser = await getQueueFromGTID(gtid);
    if (queueUser) {
      res.status(200).json({ gtid: queueUser.gtid, name: queueUser.name });
      return;
    }

    // Add user to queue
    const randomName = await getRandomName();
    await enqueueUser(gtid, randomName);
    res.status(201).json({ gtid: gtid, name: randomName });
    return;
  } catch (err: any) {
    console.error("There was an error enqueuing the user:", err);
    res.status(500).json({ message: "There was an error enqueuing the user" });
    return;
  }
};

export const updateNameHandler = async (req: Request, res: Response) => {
  try {
    const gtid = req.body.gtid;
    const newName = req.body.name;

    await updateName(gtid, newName);
    res.status(200).json({ gtid: gtid, name: newName });
    return;
  } catch (err: any) {
    console.error("There was an error updating queue name:", err);
    res.status(500).json({ message: "There was an error updating queue name" });
    return;
  }
};

export const getDataHandler = async (_req: Request, res: Response) => {
  try {
    const length = await getQueueLength();
    const data = await getQueue();
    res.status(200).json({ length: length, data: data });
    return;
  } catch (err: any) {
    console.error("There was an error getting queue data:", err);
    res.status(500).json({ message: "There was an error getting queue data" });
    return;
  }
};

export const dequeueHandler = async (_req: Request, res: Response) => {
  try {
    const user = await dequeueUser();
    if (user) {
      res.status(200).json({ gtid: user.gtid, name: user.name });
    } else {
      res.status(404).json({ message: "Queue is empty" });
    }
    return;
  } catch (err: any) {
    console.error("There was an error getting queue data:", err);
    res.status(500).json({ message: "There was an error getting queue data" });
    return;
  }
};
