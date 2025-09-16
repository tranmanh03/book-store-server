const express = require("express");
const orderController = require("../controllers/orderController");
const verifyToken = require("../middleware/verifyToken");
const verifyAdminAccount = require("../middleware/verifyAdminAccount");
const orderRouter = express.Router();

orderRouter.get(
    "/get-all-order",
    verifyAdminAccount,
    orderController.getAllOrder
);
orderRouter.get("/get-my-order", verifyToken, orderController.getOrder);
orderRouter.post("/create", verifyToken, orderController.createOrder);

// orderRouter.put(
//     "/update-status",
//     verifyAdminAccount,
//     orderController.updateOrderStatus
// );

module.exports = orderRouter;
