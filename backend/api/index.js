const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("../config/db");

const app = express();

app.use(cors());
app.use(express.json());


app.use(async (req,res,next)=>{
    try {
        await connectDB();
        next();
    } catch(error) {
        res.status(500).json({
            error: "Database connection failed"
        });
    }
});


const productRoutes = require("../routes/productRoutes");

app.use("/api/products", productRoutes);


app.get("/", (req,res)=>{
    res.json({
        message:"UHKDU Inventory Backend Running on Vercel"
    });
});


module.exports = app;