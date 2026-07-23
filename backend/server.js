const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");


const app = express();


// Middleware
app.use(cors());

app.use(express.json());


// Routes
const productRoutes = require("./routes/productRoutes");

app.use("/api/products", productRoutes);



// Test API
app.get("/", (req,res)=>{

    res.json({
        message:"UHKDU Inventory Backend Running"
    });

});



// Server
const PORT = process.env.PORT || 8080;


app.listen(PORT,()=>{

    console.log(
        `Server running on port ${PORT}`
    );

});