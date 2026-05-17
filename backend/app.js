import "dotenv/config";

import cors from "cors";
import express from "express";
import AuthorizationRoutes from './routes/auth.routess.js';
import authRoutes from './routes/auth.routes.js';
import createTrips from './routes/createTrip.route.js';
import db from './config/db.js';
const port = process.env.PORT;
console.log(process.env.PORT);
const token = process.env.JWT_SECRET;
console.log(token);

const app = express();
app.use((req, res, next) => {
  console.log("METHOD:", req.method);
  console.log("URL:", req.url);
  next();
});
db();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());
app.use(AuthorizationRoutes);
app.use(authRoutes);
app.use(createTrips);
app.listen(port, ()  => {console.log("app was running successfully")});
console.log(process.env.MONGODB_URI);