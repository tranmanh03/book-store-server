const express = require("express");
const verifyAdminAccount = require("../middleware/verifyAdminAccount");
const bookRouter = express.Router();
const bookController = require("../controllers/bookController");

bookRouter.get("/new", bookController.getNewBookList);
bookRouter.get("/hot", bookController.getHotList);
bookRouter.get("/best_seller", bookController.getBestSellingList);
bookRouter.get("/category/:type", bookController.getBookByCategory);
bookRouter.put("/update_book", verifyAdminAccount, bookController.updateBook);
bookRouter.delete(
    "/delete_book",
    verifyAdminAccount,
    bookController.deleteBook
);
bookRouter.get("/get_all_book", bookController.getAllBook);
bookRouter.post("/create", verifyAdminAccount, bookController.createBook);

module.exports = bookRouter;
