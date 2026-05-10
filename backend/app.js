import "dotenv/config";

import cors from "cors";
import express from "express";
import authRoutes from './routes/auth.routes.js';
import db from './config/db.js';
const port = process.env.PORT;
console.log(process.env.PORT);
const token = process.env.JWT_SECRET;
console.log(token);
const app = express();
app.use(express.json());
db();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use('/auths', authRoutes);
app.listen(port, ()  => {console.log("app was running successfully")});
console.log(process.env.MONGODB_URI);