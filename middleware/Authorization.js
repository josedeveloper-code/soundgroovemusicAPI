// Role-Based Access Control Middleware
module.exports = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: Please log in." });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden: You do not have the required permissions to access this route." });
    }

    next();
  };
};

