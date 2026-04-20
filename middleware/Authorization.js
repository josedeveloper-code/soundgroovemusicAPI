// Role-Based Access Control Middleware
module.exports = (role) => {
  return (req, res, next) => {
    // If the user's role from the token doesn't match the required role
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ error: "Forbidden: You do not have the required permissions" });
    }
    next();
  };
};


