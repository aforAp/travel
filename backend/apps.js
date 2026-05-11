import bcrypt from "bcryptjs";
import User from "./models/User.js";
import connectDB from './config/db.js';
const password = "admin123";
import "dotenv/config"
const hashed = await bcrypt.hash(password, 10);
console.log(process.env.MONGODB_URI);
connectDB();
await User.create({
  name: "Admin",
  email: "admin@gmail.com",
  password: hashed,
  joinedAt: new Date(),
  status: "admin",
});

