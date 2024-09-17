const PaymentModel = require("../../models/payment/payment");
const axios = require("axios");

class PaymentController {
  static async initiatePayment(req, res) {
    const { amount } = req.body;
    const userId = req.user._id;

    console.log("Received amount: ", amount);
    console.log("User ID: ", userId);

    if (!amount) {
      return res.status(400).json({
        error: "Transactionary amount is required.",
      });
    }
    try {
      const dateOfPayment = new Date();

      const payment = new PaymentModel({
        userId,
        amount,
        dateOfPayment,
      });

      console.log("Paid amount: ", payment.amount);
      await payment.save();

      //   Initialize Paystack payment
      const response = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        {
          email: req.user.email,
          amount: payment.amount * 100,
          callback_url: `${process.env.CLIENT_URL}/payment/callback`,
          metadata: {
            paymentId: payment._id,
          },
          reference: (payment._id + payment.dateOfPayment).toString(),
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        payment.status = "Initiated";
        await payment.save();
        return res.status(200).json({
          message: "Payment initiated",
          paymentUrl: response.data.data.authorization_url,
        });
      } else {
        return res.status(400).json({
          error: "Failed to initiate payment.",
          data: response.data,
        });
      }
    } catch (error) {
      console.error("Error involving paymnet:", error);

      if (error.response) {
        console.error("Error response data:", error.response.data);
        return res
          .status(error.response.status)
          .json({ error: error.response.data });
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request data:", error.request);
        return res
          .status(504)
          .json({ error: "No response received from Paystack" });
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("General error message:", error.message);
        return res.status(500).json({ error: "Internal server error" });
      }
    }
  }

  //   Paystack payment callback
  static async paymentCallback(req, res, next) {
    const { reference } = req.body;

    if (!reference) {
      return res.status(400).json({
        error: "Transaction reference is required.",
      });
    }

    try {
      // Verify payment
      const response = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
        }
      );

      const { data } = response.data;
      if (data.status === "success") {
        const paymentId = data.metadata.paymentId;
        const payment = await PaymentModel.findByPk(paymentId);

        if (payment) {
          payment.status = "successful";
          await payment.save();
          console.log("Paystack response: ", response.data);
          return res.json({
            success: true,
            message: "Payment verified successfully.",
          });
        } else {
          res.status(400).json({
            error: "Payment failed.",
          });
        }
      }
    } catch (error) {
      console.error("Error verifying payment: ", error);
      res.status(500).json({ error: "Server error." });
    }
    next();
  }

  //   Get a user's payment details
  static async getPayment(req, res, next) {
    const userId = req.user._id;

    try {
      const payment = await PaymentModel.findOne({ userId });
      if (!payment) {
        return res.status(404).json({
          error: "Payment not found.",
        });
      }
      res.status(200).json({ payment });
    } catch (error) {
      res.status(500).json({
        error: "Server error. Could not get payment transaction",
      });
    }
    next();
  }

  //   Get all payments
  static async getAllPayments(req, res, next) {
    try {
      const payments = await PaymentModel.findAll();
      res.status(200).json({ payments });
    } catch (error) {
      console.error("Error fetching payemnts.", error.error);
      res.status(500).json({
        error: "Server error. Could not get all payments.",
      });
    }
  }
}
