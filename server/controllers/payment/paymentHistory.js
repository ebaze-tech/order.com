const PaymentModel = require("../../models/payment/payment");

class PaymentHistoryController {
  static async getPaymentHistory(req, res) {
    const userId = req.user._id;

    try {
      const payments = await PaymentModel.findAll({
        where: { userId },
        order: [["dateOfPayment", "DESC"]],
      });
      if (payments.length === 0) {
        return res.status(404).json({ error: "No payment history found" });
      }

      return res.status(200).json({ payments });
    } catch (error) {
      console.error("Error fetching payment history:", error);
      return res
        .status(500)
        .json({ error: "Server error. Could not fetch payment history" });
    }
  }
}
