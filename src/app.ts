import express, { Application } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Import routes
import teamRoutes from "./routes/teamRoutes";

dotenv.config();

const app: Application = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());  // Enable CORS for all routes

// Connect to MongoDB
mongoose.connect(process.env.db || "")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("DB Connection Error:", err));

// Map routes
app.use("/api/v1/teams", teamRoutes);

// Swagger setup (optional but required for full marks)
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sports Teams API",
      version: "1.0.0",
      description: "API for managing sports teams",
    },
  },
  apis: ["./src/controllers/*.ts"],  // JSDoc comments in controllers
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use PORT from env for Vercel, default 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));