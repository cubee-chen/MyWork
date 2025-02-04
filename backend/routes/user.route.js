const express = require('express');
const verifyToken = require('../middleware/verifyToken.js');
const { registerTemp, finalizeRegistration, userLogin, getUserProfile, purchasedTemplate, getAllTemplates } = require('../controllers/user.controller.js');

const router = express.Router();

router.post("/register-temp", registerTemp); // Step 1: Store user data temporarily
router.post("/final-register", finalizeRegistration); // Step 2: Finalize registration with Notion Token
router.post("/login", userLogin); // User login
router.get("/profile", verifyToken, getUserProfile); // Get user profile
router.post("/purchase", purchasedTemplate); // Purchase a template

module.exports = router;