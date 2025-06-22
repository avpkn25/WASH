import express from "express";
const router = express.Router();
import { sendBulkEmail } from "../controllers/emailController.js";

// POST /api/send-emails
router.post("/send-emails", sendBulkEmail);

export default router;
