"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = __importDefault(require("path"));
// Import routes
const teamRoutes_1 = __importDefault(require("./routes/teamRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
// Connect to MongoDB
mongoose_1.default.connect(process.env.db || "", {
    autoIndex: true,
    serverSelectionTimeoutMS: 10000,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("DB Connection Error:", err));
// API routes
app.use("/api/v1/teams", teamRoutes_1.default);
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
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// Serve Angular build
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.get(/^(?!\/api\/v1\/teams|\/api-docs).*/, (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public/index.html"));
});
// Use PORT from env for Vercel, default 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
