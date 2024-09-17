const OrderModel = require("../../models/order/order");
const UserAccount = require("../../models/accounts/customer");

class OrderController {
  // Create new order
  static async createOrder(req, res) {
    const { orderName, price } = req.body;
    const userId = req.user._id;

    if (!orderName || !price) {
      return res.status(400).json({
        error: "Order name and price are required.",
      });
    }

    try {
      const newOrder = await OrderModel.create({
        orderName,
        price,
        userId,
      });
      return res.status(201).json({
        message: "Order created successfully.",
        newOrder,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Server error. Could not create order.",
      });
    }
  }

  // Get all orders
  static async getAllOrders(req, res) {
    try {
      const orders = await OrderModel.findAll();
      return res.status(200).json({ orders });
    } catch (error) {
      return res.status(500).json({
        error: "Server error. Could not fetch orders.",
      });
    }
  }

  //   Get single order bby ID
  static async getOrderById(req, res) {
    const { id } = req.params;

    try {
      const order = await OrderModel.findByPk(id);
      if (!order) {
        return res.status(404).json({ error: "Order not found." });
      }
      return res.status(200).json({ order });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Server error.. Could not fetch order." });
    }
  }

  //   Update order status
  static async updateOrderStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const order = await OrderModel.findByPk(id);
      if (!order) {
        return res.status(404).json({
          error: "Order not found.",
        });
      }

      order.status = status;
      await order.save();

      return res.status(200).json({
        message: "Order status updated",
        order,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Server error. Could not update order status.",
      });
    }
  }
}

module.exports = OrderController;
