import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Import routes
import teamRoutes from "./routes/teamRoutes";

dotenv.config();

const app: Application = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.db || "")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("DB Connection Error:", err));

// Map routes
app.use("/api/v1/teams", teamRoutes);

app.listen(4000, () => console.log("Server running on port 4000"));
