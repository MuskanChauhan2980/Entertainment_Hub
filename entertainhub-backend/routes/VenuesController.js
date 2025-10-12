import express from "express";
import { sendOtp, verifyOtp, sendWhatsAppOtp,     
    verifyWhatsAppOtp } from "../controller/contactController.js";
import { getCaptcha, verifyCaptcha }  from "../middleware/contactController.js";
import {submitVenueRegistration}  from "../controller/VenuesController.js"
const router = express.Router();
router.get("/captcha", getCaptcha);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/submit",verifyCaptcha, submitVenueRegistration);

export default router;