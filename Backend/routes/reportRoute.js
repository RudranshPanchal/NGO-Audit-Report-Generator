import express from "express";
import { generateAuditReport } from "../controllers/reportController.js";

const router = express.Router();
router.post("/generate", generateAuditReport);

export default router;  
