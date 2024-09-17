const PaymentModel = require("../../models/payment/payment");
const axios = require("axios");

class RefundController {
  static async initiateRefund(req, res) {
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({
        error: "Payment ID is required.",
      });
    }

    try {
      // Retrieve payment
      const payment = await PaymentModel.findByPk(paymentId);
      if (!payment || payment.status !== "successful") {
        return res
          .status(400)
          .json({ error: "Invalid or unsuccessful payment." });
      }

      //   Initiate refund with Paystack
      const response = await axios.post(
        "https://api.paystack.co/refund",
        {
          transaction: payment.transactionId,
          amount: payment.amount * 100, // amount in kobo
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
        }
      );
      if (response.data.status === "success") {
        payment.status = "refunded";
        await payment.save();

        return res.status(200).json({
          success: true,
          message: "Refund initiated successfully",
          data: response.data.data,
        });
      } else {
        return res
          .status(400)
          .json({ error: "Refund initiation failed", data: response.data });
      }
    } catch (error) {
      console.error("Error during refund:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
