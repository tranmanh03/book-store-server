const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        phone: { type: Number, require: true },
        address: { type: String },
        avatarUrl: { type: String },
        isAdmin: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
