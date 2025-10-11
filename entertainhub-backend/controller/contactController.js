import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();
let otpStore = {}; // Temporary OTP store in memory

export const sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Verification OTP",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });

    res.json({ success: true, message: "OTP sent successfully!" });
  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(500).json({ success: false, message: "Failed to send OTP." });
  }
};

export const verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore[email];

  if (!record)
    return res.status(400).json({ success: false, message: "OTP not found." });
  if (Date.now() > record.expires)
    return res.status(400).json({ success: false, message: "OTP expired." });
  if (parseInt(otp) !== record.otp)
    return res.status(400).json({ success: false, message: "Invalid OTP." });

  delete otpStore[email];
  res.json({ success: true, message: "OTP verified successfully!" });
};

export const submitContactForm = async (req, res) => {
  try {
    const {
      fullName,
      email,
      whatsappNumber,
      instagramUrl,
      gender,
      dateOfBirth,
      purpose,
      message,
    } = req.body;

    const prisma = new PrismaClient();
    await prisma.contactRequest.create({
      data: {
        fullName,
        email,
        whatsappNumber,
        instagramUrl,
        gender,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        purpose,
        message,
        verifiedEmail: true,
      },
    });

    res.json({
      success: true,
      message: "Contact form submitted successfully!",
    });
  } catch (error) {
    console.error("Error saving contact form:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to save contact form." });
  }
   finally {
      await prisma.$disconnect();  
  }
};
