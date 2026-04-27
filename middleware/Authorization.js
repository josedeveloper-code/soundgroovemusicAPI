// Role-Based Access Control Middleware
module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: "Unauthorized: Please log in to access our soundgroove music app"
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Forbidden: You do not have the required permissions"
      });
    }

    next();
  };
};

const authorize = (allowedRoles = []) => {
  return (req, res, next) => {
    // req.user was set by the authenticateToken middleware
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: Please log in." });
    }

    // Check if the user's role is in the array of allowed roles
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: "Forbidden: You do not have the required permissions to access this route." 
      });
    }

    // If they have the right role, let them through
    next();
  };
};

module.exports = authorize;

