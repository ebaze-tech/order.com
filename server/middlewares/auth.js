const jwt = require("jsonwebtoken");

const authMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    // const token = req.header("Authorization").replace("Bearer ", "")
    const authHeader = req.header("Authorization");
    console.log("Auth Header: ", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Authentication token is missing or malformed." });
    }
    const token = authHeader.replace("Bearer ", "");
    console.log("Token: ", token);
    if (!token) {
      return res.status(403).json({ error: "Access denied" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ error: "Insufficient permissions" });
      }
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  };
};

module.exports = authMiddleware;
