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
app.set("trust proxy", 1);
app.disable("x-powered-by");

const allowedOrigins = [process.env.FRONTEND_URL, process.env.FRONTEND_URL_2].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error("CORS policy: Origin not allowed"));
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
app.use("/auth", require("./routes/authroutes"));
app.use("/public", require("./routes/publicroutes"));

app.use("/profile", authenticate, require("./routes/profileroutes"));
app.use("/logout", authenticate, require("./routes/logoutroutes"));

app.use("/tracks", require("./routes/trackroutes"));

app.use("/artist", authenticate, authorize(["artist"]), require("./routes/artistroutes"));
app.use("/artist-only", authenticate, authorize(["artist"]), require("./routes/artistonlyroutes"));

app.use("/admin", authenticate, authorize(["admin"]), require("./routes/adminroutes"));
app.use("/admin-only", authenticate, authorize(["admin"]), require("./routes/adminonlyroutes"));

app.use("/protected", authenticate, require("./routes/protected.routes"));

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
