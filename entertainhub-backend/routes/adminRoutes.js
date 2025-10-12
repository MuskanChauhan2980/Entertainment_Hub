import express from "express";
import { getAllApplications, updateApplicationStatus } from "../controller/adminController.js";

const router = express.Router();

router.get("/applications", getAllApplications);
router.put("/applications/:id/status", updateApplicationStatus);

export default router;
