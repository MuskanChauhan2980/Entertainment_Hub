import express from "express";
import { sendOtp, verifyOtp, sendWhatsAppOtp,     
    verifyWhatsAppOtp } from "../controller/contactController.js";
import { getCaptcha, verifyCaptcha }  from "../middleware/contactController.js";
import {submitDjApplication}  from "../controller/djPartySubmissionController.js"
const router = express.Router();
router.get("/captcha", getCaptcha);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/submit",verifyCaptcha, submitDjApplication);

export default router;