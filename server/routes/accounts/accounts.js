const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/auth");

// Route accessible to admins only
router.get("/admin-dashboard", authMiddleware(["Admin"]), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

// Route accessible to customers only
router.get("/customer-orders", authMiddleware(["Customer"]), (req, res) => {
  res.json({ message: "Customer Orders" });
});

// Route accessible to delivery agents only
router.get(
  "/delivery-dashboard",
  authMiddleware(["Delivery Agent"]),
  (req, res) => {
    res.json({ message: "Delivery Dashboard" });
  }
);

module.exports = router;
