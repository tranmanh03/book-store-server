const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        orderItems: [
            {
                book: {
                    book_name: { type: String, require: true },
                    price: { type: Number, require: true },
                    in_stock: { type: Number, require: true },
                    book_img: { type: String },
                    discount: Number,
                },
                quantity: { type: Number, require: true, default: 1 },
            },
        ],
        paymentMethod: { type: String, required: true },
        shippingPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        totalOrder: { type: Number, require: true },
        user: {
            _id: {
                type: String,
                require: true,
            },
            name: { type: String },
            email: { type: String, required: true, unique: true },
            phone: { type: Number, require: true },
            address: { type: String, required: true },
        },
        isPaid: { type: Boolean, default: false },
        isDelivered: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
