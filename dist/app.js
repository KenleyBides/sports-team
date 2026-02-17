"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
// Import routes
const teamRoutes_1 = __importDefault(require("./routes/teamRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
// Connect to MongoDB
mongoose_1.default.connect(process.env.db || "")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("DB Connection Error:", err));
// Map routes
app.use("/api/v1/teams", teamRoutes_1.default);
app.listen(4000, () => console.log("Server running on port 4000"));
