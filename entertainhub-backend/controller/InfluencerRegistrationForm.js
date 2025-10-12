 // influencer.controller.js (or influencer.router.js)

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// NOTE: This function assumes that CAPTCHA validation and Email OTP verification
// have been successfully completed as middleware/prior steps before this controller.
export const submitInfluencerApplication = async (req, res) => {
    
    // --- 0. Destructure and EXCLUDE fields we do not want to save ---
    const { 
        userCaptchaAnswer, 
        captchaId,
        contentType, 
        collaborationInterest,
        // Fields to EXCLUDE from the final database object:
        influencerName, 
        whatsapp,
        tiktok,
        youtube,
        facebook,
        // The rest of the fields go into 'formData'
        ...formData 
    } = req.body;
    
    // --- 1. Basic Server-Side Validation (Required fields) ---
    // Note: Validation checks only use the fields that were required in the original form.
    if (!formData.fullName || !formData.email || !formData.phone || !formData.instagram || !formData.followers || !formData.agreeToTerms) {
        return res.status(400).json({ 
            success: false, 
            message: "Missing essential required fields: Full Name, Email, Phone, Instagram, Followers, and Terms agreement." 
        });
    }

    // --- 2. Prepare Data & Database Insertion (Using create) ---
    try {
        const dataToSave = {
            ...formData, // This spread operator now contains only the fields you want to save
            
            // Set required boolean flags
            isEmailVerified: true, 
            
            // Convert array fields to comma-separated strings
            contentType: Array.isArray(contentType) ? contentType.join(', ') : (contentType || null),
            collaborationInterest: Array.isArray(collaborationInterest) ? collaborationInterest.join(', ') : (collaborationInterest || null),
        };

        // Attempt to create a NEW record.
        const result = await prisma.influencerApplication.create({
            data: dataToSave,
        });

        console.log("Influencer Application Created:", result.id);

        return res.status(201).json({ 
            success: true, 
            message: "Influencer registration submitted successfully!",
            data: { id: result.id, email: result.email }
        });

    } catch (error) {
        console.error("Prisma submission error:", error);
        
        // Handle Unique Constraint Violation (P2002)
        if (error.code === 'P2002') { 
            return res.status(409).json({ success: false, message: "This email is already registered." });
        }

        return res.status(500).json({ success: false, message: "Internal server error during registration." });
    }
};