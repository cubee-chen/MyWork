const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const User = require("../models/user.model.js");
const Template = require("../models/template.model.js");

let tempUsers = {}; // Temporary storage for step 1 registration

// First step: Store user credentials temporarily
const registerTemp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if email already exists in DB
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Store user data in temporary storage
    tempUsers[email] = { username, hashedPassword };

    res
      .status(200)
      .json({ message: "Step 1 completed, proceed to token input." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Second step: Finalize registration with Notion Token
const finalizeRegistration = async (req, res) => {
  try {
    const { email, notionToken } = req.body;

    if (!tempUsers[email])
      return res
        .status(400)
        .json({ message: "User data expired or not found." });

    // Retrieve stored user data
    const { username, hashedPassword } = tempUsers[email];

    // Create a new user in MongoDB
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      notionToken, // Store Notion API Token in DB
    });

    await newUser.save();
    delete tempUsers[email]; // Remove temp storage after saving

    res.status(201).json({ message: "Registration complete!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if email exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid email or password" });

    // generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set to true in production when using HTTPS
      sameSite: "lax", 
    });

    res.status(200).json({
      message: "Login successful",
      username: user.username,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const userLogout = (req, res) => {
  res.clearCookie("token",{
    httpOnly: true,
    secure: false, // set to true in production when using HTTPS
    sameSite: "lax", 
  });
  res.status(200).json({ message: "登出成功" });
}

const getUserProfile = async (req, res) => {
  try {
    // req.user was set by verifyToken middleware
    const userId = req.user.userId;

    // Get user from DB (omit password)
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "用戶不存在" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("獲取用戶資訊錯誤：", error);
    res.status(500).json({ message: "伺服器錯誤，請稍後再試" });
  }
};

const purchasedTemplate = async (req, res) => {
  try {
    const { email, templateName } = req.body;

    console.log("Received purchase request:", { email, templateName });

    // check if email exists
    const user = await User.findOne({ email });
    if (!user) {
      console.error("User not found:", email);
      return res.status(400).json({ message: "Invalid email" });
    }

    // check if template exists
    const template = await Template.findOne({ name: templateName });
    if (!template) {
      console.error("Template not found:", templateName);
      return res.status(404).json({ message: "模板不存在" });
    }

    // check if user has already purchased the template
    if (user.purchasedTemplates.includes(templateName)) {
      console.warn("User already purchased template:", templateName);
      return res.status(400).json({ message: "您已經購買過此模板" });
    }

    // update user's purchasedTemplates array
    user.purchasedTemplates.push(template._id);
    await user.save();

    console.log("User purchase saved:", user);

    res.status(200).json({
      message: "購買成功",
      purchasedTemplates: user.purchasedTemplates,
      notionUrl: template.notionUrl,
    });
  } catch (error) {
    console.error("Error in purchase API:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerTemp,
  finalizeRegistration,
  userLogin,
  userLogout,
  getUserProfile,
  purchasedTemplate,
};
