import express from "express";
import { verifyToken } from "../middleware/authmiddleware";

const router = express.Router();

router.get("/blog", verifyToken, (req, res) => {
  res.json({ message: "You can see this only if logged in!", user: req.user });
});

export default router;
