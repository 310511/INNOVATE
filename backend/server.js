import express from "express";
import { pool } from "./config/db.js";   
import authRoutes from "./routes/authRoutes.js"; 
import otpRoutes from "./routes/otpRoutes.js"
import morgan from"morgan";
import cors from "cors";
import startupRoutes from "./routes/startupRoutes.js"
import sessionRoutes from "./routes/sessionRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import scoreRoutes from "./routes/scoreRoutes.js"
import {config} from 'dotenv'


config()
const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: [
    "http://localhost:5173",    
    "https://innovatepitch.com", 
    "https://www.innovatepitch.com", 
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, 
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev")); 


async function connectDB() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log(" PostgreSQL Connected at:", res.rows[0].now);
  } catch (err) {
    console.error(" Database Connection Error:", err.message);
  }
}
connectDB();


app.use("/api/auth", authRoutes);
app.use("/api/otp",otpRoutes)
app.use("/startup",startupRoutes)
app.use("/session", sessionRoutes)
app.use("/user", userRoutes)
app.use("/score", scoreRoutes)


app.get("/", (req, res) => {
  res.send("Backend server is running...");
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
