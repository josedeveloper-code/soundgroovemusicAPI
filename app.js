// 1. Load Environment Variables (Must be first)
require('dotenv').config();

// 2. Core Dependencies
const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');

// 3. Middleware & Auth Logic
const logger = require("./middleware/logger");
const { authenticateToken: authenticate } = require("./middleware/authentication");
const authorize = require("./middleware/Authorization");

// 4. Initialize Express
const app = express();

// Validate critical config
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET must be defined in .env file");
}

// 5. Global Middleware
app.set("trust proxy", 1);
app.disable("x-powered-by");

const allowedOrigins = [process.env.FRONTEND_URL, process.env.FRONTEND_URL_2].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error("CORS policy: Origin not allowed"));
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

// 6. Routes
app.use("/auth", require("./routes/authroutes"));
app.use("/public", require("./routes/publicroutes"));
app.use("/profile", authenticate, require("./routes/profileroutes"));
app.use("/logout", authenticate, require("./routes/logoutroutes"));
app.use("/tracks", require("./routes/trackroutes"));
app.use("/artist", authenticate, authorize(["artist"]), require("./routes/artistroutes"));
app.use("/admin", authenticate, authorize(["admin"]), require("./routes/adminroutes"));
app.use("/protected", authenticate, require("./routes/protected.routes"));
app.use("/auth", require("./routes/authroutes"));
// 7. Error Handling (Last)
app.use((req, res) => res.status(404).json({ error: "Route not found" }));

module.exports = app;