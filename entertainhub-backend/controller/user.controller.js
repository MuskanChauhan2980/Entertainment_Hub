// controller/user.controller.js
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import twilio from "twilio";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import  jwt  from "jsonwebtoken";

dotenv.config();
const prisma = new PrismaClient();

// Twilio client
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP via Email (already working)
const sendEmailOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    logger: true, // enable debug logs
    debug: true
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for Entertainment Hub Signup",
    text: `Your OTP is ${otp}. It will expire in 10 minutes.`
  });
};

// Send OTP via WhatsApp (updated)
const sendWhatsAppOTP = async (phone, otp) => {
  try {
    const message = await twilioClient.messages.create({
      from: 'whatsapp:+14155238886', // Twilio sandbox number
      to: `whatsapp:${phone}`,       // recipient number with country code
      body: `Your OTP for Entertainment Hub is ${otp}. Do not share it with anyone.`
    });
    console.log("WhatsApp OTP sent. SID:", message.sid);
  } catch (error) {
    console.error("Error sending WhatsApp OTP:", error);
  }
};

// Signup Route
export const signupDetails = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    await prisma.user.create({
      data: { name, email, phone, password: hashedPassword, otp, otpExpiry, verified: false }
    });

    // Send OTP via Email & WhatsApp
    await Promise.all([
      sendEmailOTP(email, otp),
      sendWhatsAppOTP(phone, otp)
    ]);

    res.json({
      message: "OTP sent successfully to your Email and WhatsApp",
      user: { email, name, isSignup: false }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Signup failed" });
  }
};

// Verify OTP Route
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.verified) return res.json({ message: "Already verified" });

    if (user.otp === otp && new Date() < user.otpExpiry) {
        await prisma.user.update({
          where: { email },
          data: { verified: true, otp: null, otpExpiry: null, isSignup: true }
        });

        res.json({
          message: "OTP verified successfully! You can now log in.",
          user: { email: user.email, name: user.name, isSignup: true }
        });
    } else {
      res.status(400).json({ message: "Invalid or expired OTP" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Verification failed" });
  }
};


// Login Route
export const loginDetails = async (req, res) => {
  const { email, password } = req.body;

  // Your logic: find user + check password
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

    res.json({
    message: "Login successful",
    user: { email: user.email, name: user.name, isSignup: true },
    token,
  });
};