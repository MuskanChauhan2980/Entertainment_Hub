import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Submit promoter application (already implemented)
export const submitPromoterForm = async (req, res) => {
  const {
    fullName,
    email,
    phone,
    whatsapp,
    instagram,
    experience,
    networkSize,
    preferredVenues,
    marketingSkills,
    availability,
    commissionExpectation,
    references,
  } = req.body;

  if (!fullName || !email || !phone || !experience) {
    return res.status(400).json({ success: false, message: "Missing required fields." });
  }

  const marketingSkillsString = Array.isArray(marketingSkills) 
    ? marketingSkills.join(', ') 
    : (marketingSkills || '');

  try {
    const application = await prisma.bookingRequest.create({
      data: {
        fullName,
        email,
        phone,
        whatsapp,
        instagram,
        experience,
        networkSize,
        preferredVenues,
        marketingSkills: marketingSkillsString,
        availability,
        commissionExpectation,
        references,
        status: "PENDING", // default status
      },
    });

    res.status(201).json({ success: true, message: "Promoter application submitted!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// Admin: Get all promoter applications
// export const getAllPromoters = async (req, res) => {
//   try {
//     const applications = await prisma.bookingRequest.findMany({
//         where:{
//             guestCount:{} //more then 20
//         },
//       orderBy: { createdAt: "desc" },
//     });
//     res.json({ success: true, data: applications });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Failed to fetch applications" });
//   }
// };

export const getAllPromoters = async (req, res) => {
  try {
    const applications = await prisma.bookingRequest.findMany({
      where: {
        OR: [
          { guestCount: "20+" },
        ],
      },
      orderBy: { createdAt: "desc" },
    });

    res.json({ success: true, data: applications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch applications" });
  }
};



// Admin: Update promoter status (Approve/Reject)
export const updatePromoterStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["APPROVED", "REJECTED"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const updated = await prisma.bookingRequest.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    res.json({ success: true, message: "Status updated", data: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update status" });
  }
};
