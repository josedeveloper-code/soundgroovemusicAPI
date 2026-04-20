const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const auth = require("../middleware/authentication");
const role = require("../middleware/Authorization");

// REGISTER (public)
router.post("/register", userController.register);

// LOGIN (public)
router.post("/login", userController.login);

// GET current user (must be logged in)
router.get("/me", auth, (req, res) => {
  res.json({ user: req.user });
});

// OPTIONAL: Get all users (admin only)
router.get("/", auth, role("admin"), async (req, res) => {
  try {
    const { Users } = require("../models");
    const users = await Users.findAll({ attributes: { exclude: ["password"] } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

