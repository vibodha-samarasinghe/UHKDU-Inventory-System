const express = require("express");

const router = express.Router();


const {

    getProducts,
    addProduct,
    updateQuantity,
    deleteProduct

} = require("../controllers/productController");



// Get all products
router.get("/", getProducts);



// Add new product
router.post("/", addProduct);



// Update product
router.put("/:id", updateQuantity);



// Delete product
router.delete("/:id", deleteProduct);



module.exports = router;