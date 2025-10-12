 import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
 
export const submitPromoterForm = async (req, res) => {
    // Destructure all expected fields, including CAPTCHA verification data
    const {
        fullName,
        email,
        phone,
        whatsapp,
        instagram,
        experience,
        networkSize,
        preferredVenues,
        marketingSkills, // This is an array from the frontend
        availability,
        commissionExpectation,
        references,
    } = req.body;

    // 1. Client-Side Required Field Validation Check (Basic)
    if (!fullName || !email || !phone || !experience  ) {
        return res.status(400).json({ success: false, message: "Missing required fields." });
    }
    
   
    // 3. Data Transformation for Prisma/MySQL
    // Convert array of marketingSkills to a comma-separated string
    const marketingSkillsString = Array.isArray(marketingSkills) 
        ? marketingSkills.join(', ') 
        : (marketingSkills || ''); // handle if it's already a string or null/undefined

    // 4. Database Submission
    try {
        const application = await prisma.promoterApplication.create({
            data: {
                fullName,
                email,
                phone,
                whatsapp,
                instagram,
                experience,
                networkSize,
                preferredVenues,
                marketingSkills: marketingSkillsString, // Use the stringified version
                availability,
                commissionExpectation,
                references,
                // status defaults to "PENDING"
            },
        });

        console.log("New Promoter Application Saved:", application.id);

        res.status(201).json({ 
            success: true, 
            message: "Promoter application submitted! We will review your profile soon."
        });

    } catch (error) {
        console.error("Error saving promoter application:", error);
        res.status(500).json({ 
            success: false, 
            message: "An unexpected server error occurred during submission." 
        });
    }  
};