const DeliveryModel = require("../../models/productDelivery/productDelivery");
const OrderModel = require("../../models/order/order");

class DeliveryController {
  // Create delivery for am order
  static async createDelivery(req, res) {
    const { orderId, deliveryAddress } = req.body;

    try {
      const order = await OrderModel.findByPk(orderId);
      if (!order) {
        return res.status(404).json({
          error: "Order not found.",
        });
      }
      const delivery = await DeliveryModel.create({
        orderId,
        deliveryAddress,
        deliveryStatus: "pending",
      });

      return res.status(201).json({
        message: "Delivery created",
        delivery,
      });
    } catch (error) {
      console.error("Error creating delivery:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // Update delivery status
  static async updateDeliveryStatus(req, res) {
    const { deliveryId } = req.params;
    const { status } = req.body;

    try {
      const delivery = await DeliveryModel.findByPk(deliveryId);
      if (!delivery) {
        return res.status(404).json({ error: "Delivery not found" });
      }

      delivery.deliveryStatus = status;
      if (status === "delivered") {
        delivery.deliveryDate = new Date();
      }

      await delivery.save();
      return res.status(200).json({
        message: "Delivery status updated",
        delivery,
      });
    } catch (error) {
      console.error("Error updating delivery status:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // Assign a driver for the delivery
  static async assignDriver(req, res) {
    const { deliveryId } = req.params;
    const { driverName } = req.body;

    try {
      const delivery = await DeliveryModel.findByPk(deliveryId);
      if (!delivery) {
        return res.status(404).json({ error: "Delivery not found" });
      }

      delivery.assignedDriver = driverName;
      await delivery.save();

      return res.status(200).json({
        message: "Driver assigned successfully",
        delivery,
      });
    } catch (error) {
      console.error("Error assigning driver:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // Get the status of a delivery
  static async getDeliveryStatus(req, res) {
    const { deliveryId } = req.params;

    try {
      const delivery = await DeliveryModel.findByPk(deliveryId);
      if (!delivery) {
        return res.status(404).json({ error: "Delivery not found" });
      }

      return res.status(200).json({
        deliveryStatus: delivery.deliveryStatus,
        deliveryDate: delivery.deliveryDate,
      });
    } catch (error) {
      console.error("Error fetching delivery status:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = DeliveryController;
