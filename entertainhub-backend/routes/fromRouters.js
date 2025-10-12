import express from "express";
import { submitPromoterForm } from "../controller/formController.js"
import { getCaptcha, verifyCaptcha }  from "../middleware/contactController.js";
import { sendOtp, verifyOtp,sendWhatsAppOtp,     
    verifyWhatsAppOtp } from "../controller/contactController.js";
const router = express.Router();
router.post('/send-otp',sendOtp);
router.post('/verify-otp', verifyOtp);
router.get("/captcha", getCaptcha);
router.post("/submit",verifyCaptcha,submitPromoterForm );

export default router;
