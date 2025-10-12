import express from "express";
import { getAllApplications, updateApplicationStatus } from "../controller/adminController.js";
import {checkAdmin }  from   "../middleware/adminmiddleware.js"
const router = express.Router();

router.get("/applications", checkAdmin,getAllApplications);
router.put("/applications/:id/status", updateApplicationStatus);

export default router;
