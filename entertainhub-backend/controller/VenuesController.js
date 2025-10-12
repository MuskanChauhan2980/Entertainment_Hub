import { PrismaClient } from "@prisma/client";
// Ensure 'prisma' is initialized once, as done in your existing code.
const prisma = new PrismaClient();
 

export const submitVenueRegistration = async (req, res) => {
    const {
        venueName,
        venueType,
        contactPerson,
        email,
        phone,
        whatsapp,
        address,
        capacity,
        operatingHours,
        musicGenre, // Array from React state
        amenities,    // Array from React state
        website,
        instagram,
        description,
        partnershipInterest,
    } = req.body; 

    // 1. Basic Server-Side Validation
    if (!venueName || !venueType || !contactPerson || !email || !phone || !address ) {
        return res.status(400).json({ 
            success: false, 
            message: "Missing required venue information." 
        });
    }


    // 3. Data Transformation (Convert arrays to comma-separated strings)
    const musicGenreString = Array.isArray(musicGenre) ? musicGenre.join(", ") : null;
    const amenitiesString = Array.isArray(amenities) ? amenities.join(", ") : null;
    
    // NOTE: You should also check if the email has been verified via the OTP flow
    // by querying your User model or a separate verification status table.
    // For this example, we assume verification happens before this endpoint is hit.

    try {
        // 4. Database Submission
        const newVenueRegistration = await prisma.venueRegistration.create({
            data: {
                venueName,
                venueType,
                contactPerson,
                email,
                phone,
                whatsapp: whatsapp || null,
                address,
                capacity: capacity ? String(capacity) : null, // Ensure capacity is stored as a string or null
                operatingHours: operatingHours || null,
                musicGenre: musicGenreString,
                amenities: amenitiesString,
                website: website || null,
                instagram: instagram || null,
                description: description || null,
                partnershipInterest: partnershipInterest || null,
            },
        });

        console.log("New Venue Registration Saved:", newVenueRegistration.id);

        res.status(201).json({ 
            success: true, 
            message: "Venue registration submitted successfully! We will contact you soon."
        });

    } catch (error) {
        console.error("Error saving venue registration:", error);
        res.status(500).json({ 
            success: false, 
            message: "An unexpected server error occurred during registration." 
        });
    }
};