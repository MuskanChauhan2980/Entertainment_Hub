import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js"; // ✅ ESM import
import contactRoutes from "./routes/contactRoutes.js";
import submitPromoterForm  from "./routes/fromRouters.js";
import submitBookingForm  from "./routes/bookingRoutes.js";
import submitDjApplication  from "./routes/djpartySubmissionRoutes.js";
dotenv.config();

const prisma = new PrismaClient();
const app = express();

// Change your React app's development port if it's not 3000
const allowedOrigin = process.env.NODE_ENV === 'production' 
    ? 'https://your-production-domain.com' 
    : 'http://localhost:5173'; // Assuming React runs on 3000

app.use(cors({
    origin: allowedOrigin, // Explicitly set the allowed origin
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Ensure all methods are allowed
    allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Use routes
app.use("/api", userRouter);
app.use("/api/contact", contactRoutes);
app.use('/api/promoterFrom',submitPromoterForm);
app.use('/api/bookingForm',submitBookingForm);
app.use('/api/djPartysubmission',submitDjApplication);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
