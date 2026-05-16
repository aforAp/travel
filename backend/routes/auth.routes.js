import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";

import User from '../models/User.js';
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();



// PROTECTED ROUTES
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/all-users", authMiddleware, async (req, res) => {
  try {
    const user = await User.find().select("-password");

    res.status(200).json({
      data: "success",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;