import { Router } from "express";
import { getDbHealthy, getHealthy } from "./health.handlers";

const router = Router();

router.get("/", getHealthy);
router.get("/db", getDbHealthy);

export default router;
