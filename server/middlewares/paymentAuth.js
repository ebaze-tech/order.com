const jwt = require("jsonwebtoken");
const UserAccount = require("../models/accounts/customer");

const PaymentAuth = async (req, res, next) => {
  try {
    // Retrieve the Authorization header
    const authHeader = req.header("Authorization"); // Corrected typo in "Authorization"
    console.log("Authorization Header: ", authHeader);

    // Check if the Authorization header is present and formatted correctly
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Authentication token is missing or malformed.",
      });
    }

    // Extract the token from the Authorization header
    const token = authHeader.replace("Bearer ", "");
    console.log("Extracted Token: ", token);

    if (!token) {
      return res.status(401).json({
        error: "Token is missing.",
      });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token: ", decoded);

    // Fetch the user from the database using the decoded token's userId
    const user = await UserAccount.findById(decoded.userId);
    console.log("Authenticated User: ", user);

    // If the user is not found, return an unauthorized error
    if (!user) {
      return res.status(401).json({
        error: "User not found.",
      });
    }

    // Attach the token and user to the request object for further use
    req.token = token;
    req.user = user;

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.error("Authentication error: ", error);

    // Handle various token errors such as expiration or invalid signature
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Token has expired.",
      });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        error: "Invalid token.",
      });
    }

    // Generic error handler for other cases
    res.status(401).json({
      error: "Not authorized to access this resource.",
    });
  }
};

module.exports = PaymentAuth;
