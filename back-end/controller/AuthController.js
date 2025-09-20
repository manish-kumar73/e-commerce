import express from "express";
import bcrypt from "bcrypt";
import User from "../schema/User.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const AuthController = express();

// Register User
AuthController.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });
    const existingUsername = await User.findOne({ username });
    if (existingUsername)
      return res.status(400).json({ message: "Username already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Send response first
    res.status(201).json({ message: "User registered successfully" });
    

    // Setup transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Our E-Commerce Store!",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #0056b3;">Welcome, ${username}!</h2>
          <p>Thank you for registering with us. We are excited to have you as a new member of our community.</p>
          <p>You can now explore our wide range of products and enjoy a seamless shopping experience.</p>
          <p>If you have any questions, feel free to contact our support team.</p>
          <p>Happy Shopping!</p>
          <p>The E-Commerce Team</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending welcome email:", error);
      } else {
        console.log("Welcome email sent:", info.response);
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login User
AuthController.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Profile
AuthController.put("/profile", async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = username;
    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Order Details Example (To implement properly)
AuthController.get("/orders", async (req, res) => {
  const userId = req.user?.id;  // Ensure req.user is available (use middleware)
  
  try {
    const orders = await Order.find({ userId }); // Assuming Order schema exists

    if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

export default AuthController;
