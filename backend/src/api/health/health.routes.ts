import { Router } from "express";
import { getHealthy, getSheetsHealthy } from "./health.handlers";

const router = Router();

router.get("/", getHealthy);
router.get("/sheets", getSheetsHealthy);

export default router;
