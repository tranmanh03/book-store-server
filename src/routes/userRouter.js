const express = require("express");
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");
const verifyAdminAccount = require("../middleware/verifyAdminAccount");
const userRouter = express.Router();

userRouter.delete(
    "/delete_user",
    verifyAdminAccount,
    userController.deleteUser
);
userRouter.get("/get_all_user", verifyAdminAccount, userController.getAllUser);
userRouter.put("/update_info", verifyToken, userController.updateUserInfo);

module.exports = userRouter;
