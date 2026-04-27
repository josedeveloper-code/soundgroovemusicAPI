require("dotenv").config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET must be defined in environment variables");
}

const express = require("express");
const cors = require("cors");

// Middleware Imports
const logger = require("./middleware/logger");
const { authenticateToken: authenticate } = require("./middleware/authentication");
const authorize = require("./middleware/Authorization");

const app = express();

// ----------------------
// SECURITY / GLOBAL MIDDLEWARE
// ----------------------
app.set("trust proxy", 1); // Required when running behind Render or other proxies
app.disable("x-powered-by");

const allowedOrigins = [process.env.FRONTEND_URL, process.env.FRONTEND_URL_2].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true); // allow server-to-server and tools like Postman
    }
    if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error('CORS policy: Origin not allowed'));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
  next();
});
app.use(logger);

// ----------------------
// ROUTES
// ----------------------
app.use("/auth", require("./routes/authroutes.js"));
app.use("/public", require("./routes/publicroutes.js"));
app.use("/profile", authenticate, require("./routes/profileroutes.js"));
app.use("/logout", authenticate, require("./routes/logoutroutes.js"));
app.use("/tracks", require("./routes/trackroutes.js"));
app.use("/artist", authenticate, authorize(["artist"]), require("./routes/artistdashboard.js"));
app.use("/artist-only", authenticate, authorize(["artist"]), require("./routes/artistonlyroutes.js"));
app.use("/admin", authenticate, authorize(["admin"]), require("./routes/adminroutes.js"));
app.use("/admin-only", authenticate, authorize(["admin"]), require("./routes/adminonlyroutes.js"));
app.use("/protected", authenticate, require("./routes/protected.routes.js"));

// ----------------------
// ERROR HANDLING
// ----------------------
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message
  });
});

module.exports = app;