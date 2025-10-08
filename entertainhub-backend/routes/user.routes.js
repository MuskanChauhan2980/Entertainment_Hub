// routes/user.routes.js
import express from 'express';
import { signupDetails, verifyOTP,loginDetails } from '../controller/user.controller.js';

const router = express.Router();

router.post('/signup', signupDetails);
router.post('/verify-otp', verifyOTP);
router.post('/login', loginDetails);


export default router;
