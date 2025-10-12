import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
     user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendMail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log("Mail sent to:", to);
  } catch (err) {
    console.error("Mail error:", err);
  }
};
