const jwt = require("jsonwebtoken");
const UserAccount = require("../models/accounts/account");

module.exports = {
  authenticate: async (req, res, next) => {
    const token = req.header("Autorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        error: "No token provided.",
      });
    }
    console.log("Extracted token"), token;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token payload: ", decoded);

      const { _id: id, username } = decoded;

      let User;
      User = await UserAccount.findByUsername(username);
      console.log("Found User: ", User);

      if (!User) {
        return res.status(401).json({
          error: "User not found.",
        });
      }

      req.User = User;
      return next();
    } catch (error) {
      console.error("JWT verification error: ", error);
      return res.status(401).json({
        error: error.error,
      });
    }
  },

  authorize: (user) => {
    return (req, res, next) => {
      console.log("Expected user: ", user);
      console.log("Actual user: ", user);
      if (req.user !== user) {
        return res.status(403).json({
          error: "Unauthorized.",
        });
      }
      return next();
    };
  },
};
