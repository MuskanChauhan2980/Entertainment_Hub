// routes/user.routes.js
import express from 'express';
import { signupDetails, verifyOTP } from '../controller/user.controller.js';

const router = express.Router();

router.post('/signup', signupDetails);
router.post('/verify-otp', verifyOTP);

export default router;
