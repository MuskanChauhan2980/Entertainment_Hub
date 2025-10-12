 // adminmiddleware.js
export const checkAdmin = (req, res, next) => {
  try {
    const adminEmail = req.body.email || req.query.email;

    // Hardcoded admin email for now
    if (adminEmail !== "admin@example.com") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
