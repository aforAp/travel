import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/auth.middleware.js";
const router = express.Router();

router.get(
  "/google",

  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",

  passport.authenticate("google", {
    session: false,
  }),

  async (req, res) => {
    try {
      const token = jwt.sign(
        {
          id: req.user._id,
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "7d",
        }
      );

      res.redirect(
        `http://localhost:5173/oauth-success?token=${token}`
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

router.get(
  "/me",

  authMiddleware,

  async (req, res) => {
    try {
      const user = await User.findById(
        req.userId
      );

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

router.get(
  "/existing-user",

  authMiddleware,

  async (req, res) => {
    try {
      const user = await User.findById(
        req.userId
      );

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

export default router;