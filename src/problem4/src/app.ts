import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import calculationRoutes from "./routes/calculation.routes";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/calculations", calculationRoutes);

mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

export default app;
