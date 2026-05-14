import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";

import User from '../models/User.js';
import authMiddleware from "../middleware/auth.middleware.js";
const router = express.Router();

router.post( "/signup",
  async (req, res) => {
    try {
      console.log(req.body);
      const {name, email, password, imageUrl, joinedAt} = req.body;
      console.log(name, email, password, joinedAt, imageUrl);

      const existingUser = await User.findOne({
        email,
      });

      if (existingUser) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(
        password,
        10
      );
     

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        profileImage: imageUrl,
        joinedAt
      });

      res.status(201).json({
        message: "Signup successful",
        user,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        status: 400,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get(
  "/me",
  authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findById(
        req.userId
      ).select("-password");

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

router.get('/all-users', async (req, res) => {
   try {
    const user = await User.find().select('-password');

   res.status(200).json({
    data: 'success',
    user: user
   })
   } 
   catch (error) {
   req.status(500).json({
    message: error.message
   })
   }
});

export default router;