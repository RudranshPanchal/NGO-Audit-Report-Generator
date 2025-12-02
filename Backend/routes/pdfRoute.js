import express from "express";
import { createAuditPDF } from "../pdf/pdfController.js";
import multer from "multer";

const router = express.Router();

// Multer memory storage (no disk saving)
const storage = multer.memoryStorage();
export const upload = multer({ storage });

router.post(
  "/pdf",
  upload.fields([
    { name: "auditorSignature", maxCount: 1 },
    { name: "presidentSignature", maxCount: 1 },
  ]),
  createAuditPDF
);

export default router;
