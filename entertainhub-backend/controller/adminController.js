import { PrismaClient } from "@prisma/client";
import { sendMail } from "../utils/mailer.js";

const prisma = new PrismaClient();

// 1. Get all applications
export const getAllApplications = async (req, res) => {
  try {
    const applications = await prisma.dJApplication.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// 2. Update status
export const updateApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["approved", "rejected", "pending"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    const application = await prisma.dJApplication.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    // --- Email user about status change
    await sendMail(
      application.email,
      `Your DJ Application Status: ${status.toUpperCase()}`,
      `Hello ${application.djName},\n\nYour DJ application status has been updated to: ${status.toUpperCase()}.\n\nThank you,\nDubai DJ Team`
    );

    res.json({ success: true, message: "Status updated successfully." });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Server error" });
  }
};
