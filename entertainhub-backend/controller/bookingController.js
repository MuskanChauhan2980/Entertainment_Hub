import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const submitBookingForm = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            whatsapp,
            instagram,
            eventType,
            preferredVenue,
            date, // This is a string from the frontend
            guestCount,
            tableType,
            budget,
            specialRequests,
        } = req.body; 

        // Get the bookingType passed from the React component
        const bookingType = req.body.bookingType || (tableType ? "table" : "guestlist");


        // 1. Basic Server-Side Validation
        if (!fullName || !email || !phone || !date || !guestCount == true) {
             return res.status(400).json({ 
                success: false, 
                message: "Missing essential required fields." 
            });
        }
        
 
        const bookingDate = new Date(date);
        
        if (isNaN(bookingDate)) {
             return res.status(400).json({ 
                success: false, 
                message: "Invalid date format." 
            });
        }
        

        // 3. Database Submission
        const newBooking = await prisma.bookingRequest.create({
            data: {
                bookingType,
                fullName,
                email,
                phone,
                whatsapp: whatsapp || null,
                instagram: instagram || null,
                eventType: eventType || null,
                preferredVenue: preferredVenue || null,
                date: bookingDate, 
                guestCount,
                tableType: tableType || null,
                budget: budget || null,
                specialRequests: specialRequests || null,
                
            },
        });

        console.log("New Booking Request Saved:", newBooking.id);

        res.status(201).json({ 
            success: true, 
            message: `${bookingType.toUpperCase()} request submitted successfully! We will contact you shortly.`
        });

    } catch (error) {
        console.error("Error saving booking request:", error);
        res.status(500).json({ 
            success: false, 
            message: "An unexpected server error occurred during booking submission." 
        });
    }
};