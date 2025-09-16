const express = require("express");
const authController = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken");
const authRouter = express.Router();

authRouter.post("/refresh_token", authController.refreshToken);
authRouter.post("/logout", verifyToken, authController.logout);
authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);

module.exports = authRouter;
