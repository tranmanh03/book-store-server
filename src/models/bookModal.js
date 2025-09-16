const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        book_name: { type: String, require: true },
        author: { type: String, require: true },
        rating: { type: Number, require: true },
        book_img: { type: String },
        price: { type: Number, require: true },
        category: { type: String, require: true },
        in_stock: { type: Number, require: true },
        new_book: { type: Boolean },
        selled: Number,
        description: String,
        discount: Number,
    },
    {
        timestamps: true,
    }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
