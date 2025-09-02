import { Router } from "express";
import { handleAddTa, handleGetTas, handleRemoveTa } from "./tas.handlers";

const router = Router();

router.get("/", handleGetTas);
router.post("/", handleAddTa);
router.delete("/", handleRemoveTa);

export default router;
