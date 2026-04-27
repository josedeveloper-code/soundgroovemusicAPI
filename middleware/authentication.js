const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // 1. Get the auth header
  const authHeader = req.headers['authorization'];
  
  // 2. Extract the token (Format is usually "Bearer eyJhbGciOi...")
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Access Denied: No Token Provided!" });
  }

  // 3. Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or Expired Token" });
    }
    
    // Attach the decoded payload (id, role) to the request object
    req.user = decodedUser; 
    next();
  });
};

module.exports = { authenticateToken };