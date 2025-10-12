import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import twilio from "twilio";
const prisma = new PrismaClient();
let otpStore = {}; // Temporary OTP store in memory

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();


const sendWhatsAppOTP = async (phone, otp) => {
    try {
        // Ensure the phone number is in the format 'whatsapp:+[country_code][number]'
        const twilioPhone = phone.startsWith('whatsapp:') ? phone : `whatsapp:${phone}`;
        
        const message = await twilioClient.messages.create({
            from: 'whatsapp:' + process.env.TWILIO_WHATSAPP_NUMBER, // Use environment variable for 'From'
            to: twilioPhone,       // recipient number with country code
            body: `Your OTP for Entertainment Hub is ${otp}. Do not share it with anyone. It expires in 5 minutes.`
        });
        console.log("WhatsApp OTP sent. SID:", message.sid);
        return true;
    } catch (error) {
        console.error("Error sending WhatsApp OTP:", error);
        return false;
    }
};


// ----------------------------------------------------------------------
// NEW MOBILE/WHATSAPP OTP CONTROLLERS
// ----------------------------------------------------------------------

// 1. Controller to send OTP to WhatsApp Number
export const sendWhatsAppOtp = async (req, res) => {
    const { whatsappNumber } = req.body; // Expecting the number, e.g., '+971501234567'
    const otp = generateOTP();

    // Store OTP keyed by the phone number
    otpStore[whatsappNumber] = { otp: parseInt(otp), expires: Date.now() + 5 * 60 * 1000 };

    // Use the WhatsApp sending helper
    const sentSuccessfully = await sendWhatsAppOTP(whatsappNumber, otp);

    if (sentSuccessfully) {
        res.json({ success: true, message: "WhatsApp OTP sent successfully!" });
    } else {
        // Clear stored OTP if sending failed
        delete otpStore[whatsappNumber]; 
        res.status(500).json({ success: false, message: "Failed to send WhatsApp OTP. Check your number format." });
    }
};

// 2. Controller to verify OTP for WhatsApp Number
export const verifyWhatsAppOtp = (req, res) => {
    const { whatsappNumber, otp } = req.body;
    const record = otpStore[whatsappNumber];

    if (!record)
        return res.status(400).json({ success: false, message: "OTP not found or phone number incorrect." });
    if (Date.now() > record.expires) {
        delete otpStore[whatsappNumber];
        return res.status(400).json({ success: false, message: "OTP expired." });
    }
    if (parseInt(otp) !== record.otp)
        return res.status(400).json({ success: false, message: "Invalid OTP." });

    // Success: Delete the used OTP and verify the number
    delete otpStore[whatsappNumber];
    res.json({ success: true, message: "WhatsApp OTP verified successfully!" });
};




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
