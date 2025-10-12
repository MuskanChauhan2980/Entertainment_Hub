 import { PrismaClient } from "@prisma/client";
 const prisma = new PrismaClient();
// This function assumes the verifyCaptcha middleware runs *before* it.
export const submitDjApplication = async (req, res) => {
    // The CAPTCHA fields are filtered out by the backend route chain or ignored here.
    try {
        const {
            djName,
            realName,
            email,
            phone,
            whatsapp,
            instagram,
            soundcloud,
            mixcloud,
            youtube,
            genre,
            experience,
            equipment,
            pastEvents,
            availability,
            feeExpectation,
            message,
        } = req.body;

        // --- 1. Basic Server-Side Validation (The frontend does most, but safety first)
        if (!djName || !email || !phone || !genre || !experience  ) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing essential required DJ profile fields." 
            });
        }
        
        // --- 2. Database Submission
        const newDjApplication = await prisma.dJApplication.create({
            data: {
                djName,
                realName: realName || null,
                email,
                phone,
                whatsapp: whatsapp || null,
                instagram: instagram || null,
                soundcloud: soundcloud || null,
                mixcloud: mixcloud || null,
                youtube: youtube || null,
                genre,
                experience,
                equipment: equipment || null,
                pastEvents: pastEvents || null,
                availability: availability || null,
                feeExpectation: feeExpectation || null,
                message: message || null,
                
            },
        });

        console.log("New DJ Application Saved:", newDjApplication.id);

        res.status(201).json({ 
            success: true, 
            message: "DJ application submitted successfully!" 
        });

    } catch (error) {
        
        console.error("Error submitting DJ application:", error);
        res.status(500).json({ 
            success: false, 
            message: "An unexpected server error occurred during application submission." 
        });
    }
};