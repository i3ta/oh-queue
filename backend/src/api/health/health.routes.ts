import { Router } from "express";
import { getHealthy } from "./health.handlers";

const router = Router();

router.get("/", getHealthy);

export default router;
