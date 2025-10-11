// Global store for CAPTCHA (In-memory, like your OTP store)
let captchaStore = {}; 

export const getCaptcha = (req, res) => {
    // 1. Generate the code and a unique ID (session ID or UUID)
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const captchaId = Date.now().toString(); // Simple unique ID for testing

    // 2. Store the code securely
    captchaStore[captchaId] = code; 

    // 3. Send the code and ID back to the frontend
    res.json({ success: true, codeToDisplay: code, captchaId: captchaId });
};

export const verifyCaptcha = (req, res, next) => {
    const { userCaptchaAnswer, captchaId } = req.body;
    const correctCode = captchaStore[captchaId];

    if (!correctCode || userCaptchaAnswer !== correctCode) {
        return res.status(400).json({ 
            success: false, 
            message: "Invalid CAPTCHA." 
        });
    }

    // Optional: Delete the used CAPTCHA code
    delete captchaStore[captchaId];

    // If verification passes, proceed to the next middleware (e.g., submitContactForm)
    next(); 
};