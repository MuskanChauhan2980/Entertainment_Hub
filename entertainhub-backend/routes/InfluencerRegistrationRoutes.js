import express from "express";
import { sendOtp, verifyOtp, sendWhatsAppOtp,     
    verifyWhatsAppOtp } from "../controller/contactController.js";
import { getCaptcha, verifyCaptcha }  from "../middleware/contactController.js";
import {submitInfluencerApplication}  from "../controller/InfluencerRegistrationForm.js"
const router = express.Router();
router.get("/captcha", getCaptcha);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/submit",verifyCaptcha, submitInfluencerApplication);

export default router;