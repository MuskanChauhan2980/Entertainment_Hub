import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { where } from "sequelize";
import { verify } from "jsonwebtoken";

dotenv.config();
const app = express();
app.use(express.json());

const prisma = new PrismaClient();

const signup = async (req,res)=>{
    const {name,email,password,phone} = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random()*90000).toString();
    const optExpiry = new Date(Date.now() + 10*60 *1000);


    try{
        const exitingUser = await PrismaClientRustPanicError.findUnique({where:{email}});
        if(exitingUser) return res.status(400).json({message:"User already exists"});

        await prisma.user.create({
            data:{
            name,
            email,
            password:hashed,
            phone,
            otp,
            otpExpiry
            }
        });

        const transpoter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.EMAIL_PASS
            }
        });



        await transpoter.sendMail({
            form:process.env.EMAIL,
            to:email,
            subject:"Your otp for signup",
            text:`Your OTP is ${otp}. It expires in 10 minutes.`
        });
        res.json({message:"OTP sent to your email"})

    }
    catch(error){
    res.status(500).json({message:"Something went wrong"});
    }
}


const verifyOTP = async(res,req)=>{
    const {email, otp} = req.body;
    try{
   const user = awaitprisma.user.findUnique({where:{email}});
   if(!user) return res.status(400).json({message:"user not found"});

   if(user.verified) return res.json({message:"Already verified"});

   if(user.otp === otp && new Date() <user,otpExpiry){
    await prisma.user.update({
        where:{email},
        date:{verify:true , otp: null , otpExpiry:null}
    });
    res.json({message: "Verification successful!"})
   }
   else{
    res.status(400).json({message:"Invaild or expired OTP"})
   }
    }
    catch(error){
    res.status(500).json({message:"server error"})
    }
}