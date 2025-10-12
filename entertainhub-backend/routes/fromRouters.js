import express from "express";
import { submitPromoterForm, getAllPromoters, updatePromoterStatus } from "../controller/formController.js";
import { getCaptcha, verifyCaptcha }  from "../middleware/contactController.js";
import { sendOtp, verifyOtp,sendWhatsAppOtp,     
    verifyWhatsAppOtp } from "../controller/contactController.js";
    import {checkAdmin}  from "../middleware/adminmiddleware.js"
const router = express.Router();
router.post('/send-otp',sendOtp);
router.post('/verify-otp', verifyOtp);
router.get("/captcha", getCaptcha);
router.post("/submit",verifyCaptcha,submitPromoterForm );
router.get("/all",checkAdmin, getAllPromoters); // Admin fetch all
router.put("/status/:id", updatePromoterStatus); // Admin approve/reject

export default router;
