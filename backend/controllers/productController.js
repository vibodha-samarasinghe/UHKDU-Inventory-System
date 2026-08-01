const Product = require("../models/Product");


// Get All Products
exports.getProducts = async (req, res) => {

    try {

        const products = await Product.find();

        res.json(products);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

};




// Add Product
exports.addProduct = async (req, res) => {

    try {

        const product = new Product({

            name: req.body.name,
            barcode: req.body.barcode,
            category: req.body.category,
            price: req.body.price,
            quantity: req.body.quantity,
            description: req.body.description,
            expiryDate: req.body.expiry_date,
            department: req.body.department

        });


        const savedProduct = await product.save();


        res.json({

            message: "Product Added Successfully",
            id: savedProduct._id

        });


    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

};






// Update Product
exports.updateQuantity = async (req, res) => {

    try {

        const { id } = req.params;


        await Product.findByIdAndUpdate(
            id,
            {

                name: req.body.name,
                barcode: req.body.barcode,
                category: req.body.category,
                price: req.body.price,
                quantity: req.body.quantity,
                expiryDate: req.body.expiry_date

            }
        );


        res.json({

            message: "Product Updated Successfully"

        });


    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

};






// Delete Product
exports.deleteProduct = async (req, res) => {

    try {

        const { id } = req.params;


        await Product.findByIdAndDelete(id);


        res.json({

            message: "Product Deleted Successfully"

        });


    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

};