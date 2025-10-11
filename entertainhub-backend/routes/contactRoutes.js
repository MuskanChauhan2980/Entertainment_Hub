import express from "express";
import { sendOtp, verifyOtp, submitContactForm } from "../controller/contactController.js";
import { getCaptcha, verifyCaptcha }  from "../middleware/contactController.js"
const router = express.Router();
router.get("/captcha", getCaptcha);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/submit",verifyCaptcha, submitContactForm);

export default router;
