const cloudinary = require("cloudinary").v2;
const Book = require("../models/bookModal");
const { options } = require("../routes/bookRouter");

class bookController {
    createBook = async (req, res) => {
        try {
            const {
                book_name,
                rating,
                author,
                price,
                in_stock,
                selled,
                category,
                discount,
                description,
                book_img,
                new_book,
            } = req.body;
            const imgUrl = await cloudinary.uploader.upload(book_img, {
                folder: "book_image",
                resource_type: "image",
            });
            const createdBook = await Book.create({
                book_name,
                author,
                rating,
                price,
                book_img: imgUrl.url,
                in_stock,
                selled,
                new_book,
                discount,
                category,
                description,
            });
            if (createdBook) {
                return res.status(200).json({
                    message: "Adding successfull!",
                    createdBook,
                });
            } else {
                return res.status(401).json({
                    message: "Adding failure!",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // get all book
    getAllBook = async (req, res) => {
        try {
            const bookList = await Book.find({});
            res.status(200).json({ bookList });
        } catch (error) {
            res.status(401).json({
                message: "Get all book failure",
            });
        }
    };

    // delete book
    deleteBook = async (req, res) => {
        try {
            const bookID = req.body.bookID;
            const bookDeleted = await Book.findByIdAndDelete(bookID);
            res.status(200).json({
                message: "Delete successfull",
                bookDeleted: bookDeleted._id,
            });
        } catch (error) {
            res.status(403).json({
                message: "Delete failure",
            });
        }
    };

    // update book
    updateBook = async (req, res) => {
        try {
            const {
                _id,
                book_name,
                rating,
                author,
                price,
                in_stock,
                category,
                selled,
                discount,
                description,
                imgUpdate,
                book_img,
                new_book,
            } = req.body;
            let imgUrl;
            if (imgUpdate !== "") {
                imgUrl = await cloudinary.uploader.upload(imgUpdate, {
                    folder: "book_image",
                    resource_type: "image",
                });
            }
            const bookUpdated = await Book.findByIdAndUpdate(
                _id,
                {
                    book_name,
                    rating,
                    author,
                    price,
                    in_stock,
                    selled,
                    category,
                    discount,
                    description,
                    new_book,
                    book_img: imgUrl ? imgUrl.url : book_img,
                },
                {
                    returnDocument: "after",
                }
            );
            res.status(200).json({
                message: "Update book successfully",
                bookUpdated,
            });
        } catch (error) {
            console.log(error);

            res.status(401).json({
                message: "Update failure",
            });
        }
    };

    getBookByCategory = async (req, res) => {
        try {
            const category = req.params.type;
            const result = await Book.find({ category: category });
            res.status(200).json({
                listBook: result,
            });
        } catch (error) {
            res.status(401).json({
                message: "Can't get this category",
            });
        }
    };

    getBestSellingList = async (req, res) => {
        try {
            const result = await Book.find({ selled: { $gt: 10 } });
            res.status(200).json({
                listBook: result,
            });
        } catch (error) {
            res.status(401).json({
                message: "Can't get this category",
            });
        }
    };

    getHotList = async (req, res) => {
        try {
            const result = await Book.find({ rating: { $gt: 3 } });
            res.status(200).json({
                listBook: result,
            });
        } catch (error) {
            res.status(401).json({
                message: "Can't get this list",
            });
        }
    };

    getNewBookList = async (req, res) => {
        try {
            const result = await Book.find({ new_book: true });
            res.status(200).json({
                listBook: result,
            });
        } catch (error) {
            res.status(401).json({
                message: "Can't get this list",
            });
        }
    };
}

module.exports = new bookController();
