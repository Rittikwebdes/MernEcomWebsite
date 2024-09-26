import express from "express";
import { checkout, verify } from "../Controllers/Payment.controller.js";
const router = express.Router();
router.post("/checkout", checkout)
router.post("/verify-payment",verify)
export default router;
