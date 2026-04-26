// Controller must have a lock down 

const bcrypt = require("bcrypt");
const { User } = require("../models");

const register = async (req, res) => {
  try { 
    // Notice we DO NOT include 'role' here. 
    // This stops hackers from passing "role": "admin" in their request.
    const { name, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      // We hardcode the role so every new signup is forced to be a listener
      role: "listener" 
    });

    res.status(201).json({ message: "User registered", user }); 
  } catch (error) {
     res.status(500).json({ error: error.message });
  }
};

module.exports = { register };