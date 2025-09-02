import { Router } from "express";
import {
  dequeue as dequeueHandler,
  enqueueHandler,
  getQueueData,
} from "./queue.handlers";

const router = Router();

router.post("/", enqueueHandler);
router.get("/", getQueueData);
router.delete("/", dequeueHandler);

export default router;
