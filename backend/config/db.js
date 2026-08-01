const mongoose = require("mongoose");
require("dotenv").config();

let connection = null;

const connectDB = async () => {

    if (connection) {
        return connection;
    }

    try {

        connection = await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MongoDB Connected Successfully");

        return connection;

    } catch (error) {

        console.log("❌ MongoDB Connection Error");
        console.log(error.message);

        throw error;
    }
};

module.exports = connectDB;