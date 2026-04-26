require("dotenv").config();
const express = require("express");
const cors = require("cors");

const logger = require("./middleware/logger");
const authenticate = require("./middleware/authentication");
const authorize = require("./middleware/Authorization"); 

const app = express();

// ----------------------
// GLOBAL MIDDLEWARE
// ----------------------
app.use(cors());
app.use(express.json());
app.use(logger);

// ----------------------
// ROUTES
// ----------------------

// Auth & Public
app.use("/auth", require("./routes/authroutes.js"));
app.use("/public", require("./routes/publicroutes.js"));

// User routes
app.use("/users", authenticate, require("./routes/userroutes.js"));
app.use("/user", authenticate, require("./routes/userdashboard.js"));
app.use("/profile", authenticate, require("./routes/profileroutes.js"));
app.use("/logout", authenticate, require("./routes/logoutroutes.js"));

// Artist routes
app.use("/artists", require("./routes/trackroutes.js")); 
app.use("/artist", authenticate, authorize(["artist"]), require("./routes/artistdashboard.js"));
app.use("/artist-only", authenticate, authorize(["artist"]), require("./routes/artistonlyroutes.js"));

// Track routes
app.use("/tracks", require("./routes/trackroutes.js"));

// Admin routes
app.use("/admin", authenticate, authorize(["admin"]), require("./routes/adminroutes.js"));
app.use("/admin-only", authenticate, authorize(["admin"]), require("./routes/adminonlyroutes.js"));

// Protected routes
app.use("/protected", authenticate, require("./routes/protected.routes.js"));

// ----------------------
// ERROR HANDLER
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