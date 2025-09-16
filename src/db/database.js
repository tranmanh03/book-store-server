const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connecting to DB successfully!");
    } catch (error) {
        console.log("Connecting to DB failure!!");
    }
};

module.exports = { connectDB };
