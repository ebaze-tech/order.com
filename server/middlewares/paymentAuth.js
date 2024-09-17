const jwt = require("jsonwebtoken");
const UserAccount = require("../models/accounts/customer");

const PaymentAuth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authourization");
    console.log("Auth Header: ", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Authentication token is missing or malformed.",
      });
    }
    const token = authHeader.replace("Bearer ", "");
    console.log(token);

    if (!token) {
      return res.status(401).json({
        error: "Token is missing.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Deocded token: ", decoded);

    const User = await UserAccount.findById(decoded.userId);
    console.log("User", User);

    if (!User) {
      return res.status(401).json({
        error: "User not found.",
      });
    }
    req.token = token;
    req.user = User;
    next();
  } catch (error) {
    console.error("Auth error: ", error);
    res.status(401).json({
      error: "Not authorized to access this resource.",
    });
  }
};

module.exports = PaymentAuth;
