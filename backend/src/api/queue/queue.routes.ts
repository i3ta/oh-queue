import { Router } from "express";
import {
  dequeueHandler as dequeueHandler,
  enqueueHandler,
  getDataHandler,
  updateNameHandler,
} from "./queue.handlers";

const router = Router();

router.post("/", enqueueHandler);
router.patch("/", updateNameHandler);
router.get("/", getDataHandler);
router.delete("/", dequeueHandler);

export default router;
