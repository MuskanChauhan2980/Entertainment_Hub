import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js"; // ✅ ESM import

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use(cors({
  origin: ['http://localhost:5172'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Use routes
app.use("/api", userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
