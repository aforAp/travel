import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import authRoutes from './routes/auth.routes.js';
import session from "express-session";
import "./config/passport.js";
dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());

app.use(passport.session());
app.use('/auth', authRoutes);
app.listen(port, ()  => {console.log("app was running successfully")});
console.log(process.env.MONGODB_URI);