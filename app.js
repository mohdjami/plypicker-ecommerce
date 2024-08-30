import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import logger from "./utils/logger.js";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import authMiddleware from "./middleware/auth.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import cors from "cors";
import { isLoggedIn } from "./controllers/authController.js";
const app = express();
//GLOBAL HEADERS
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.on("finish", () => {
    // console.log(res.getHeaders());
  });
  next();
});
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL, // Adjust as needed
    credentials: true,
  })
); // HTTP request logging using Morgan and Winston

app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

export const db = process.env.MONGO_URI;
if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
app.get("/health", (req, res) => {
  res.send("Health is good");
});

app.get("/api/authenticated", isLoggedIn);
app.use("/api/auth", authRoutes);
app.use("/api/products", authMiddleware, productRoutes);
app.use("/api/submissions", authMiddleware, submissionRoutes);
app.use("/api/requests", authMiddleware, reviewRoutes);
app.get("/test", (req, res) => {
  console.log(req.headers.cookie);
  res.send("Check the server logs for the cookies");
});
export default app;
