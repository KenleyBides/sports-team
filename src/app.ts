import express, { Application } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

// Import routes
import teamRoutes from "./routes/teamRoutes";

dotenv.config();

const app: Application = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// Connect to MongoDB
mongoose.connect(process.env.db || "", {
  autoIndex: true,
  serverSelectionTimeoutMS: 10000,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("DB Connection Error:", err));

// API routes
app.use("/api/v1/teams", teamRoutes);

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sports Teams API",
      version: "1.0.0",
      description: "API for managing sports teams",
    },
  },
  apis: ["./dist/controllers/*.js"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve Angular build
app.use(express.static(path.join(__dirname, "../public")));

app.get(/^(?!\/api\/v1\/teams|\/api-docs).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Use PORT from env for Vercel, default 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));