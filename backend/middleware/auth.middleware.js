import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader =
      req.headers.authorization;

    console.log("AUTH HEADER:", authHeader);

    if (!authHeader) {
      return res.status(401).json({
        message: "No token",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("TOKEN:", token);

    console.log(
      "JWT SECRET:",
      process.env.JWT_SECRET
    );

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("DECODED:", decoded);

    req.userId = decoded.id;

    next();
  } catch (error) {
    console.log("JWT ERROR:", error);

    res.status(401).json({
      message: error.message,
    });
  }
};

export default authMiddleware;