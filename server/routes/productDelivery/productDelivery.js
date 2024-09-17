const express = require("express");
const DeliveryController = require("../../controllers/productDelivery/productDelivery");
const router = express.Router();

router.post("/delivery", DeliveryController.createDelivery);
router.put(
  "/delivery/:deliveryId/status",
  DeliveryController.updateDeliveryStatus
);
router.put("/delivery/:deliveryId/assign", DeliveryController.assignDriver);
router.get(
  "/delivery/:deliveryId/status",
  DeliveryController.getDeliveryStatus
);

module.exports = router;
