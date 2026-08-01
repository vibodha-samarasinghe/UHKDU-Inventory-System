const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    barcode: {
        type: String,
        unique: true
    },

    category: {
        type: String
    },

    price: {
        type: Number
    },

    quantity: {
        type: Number,
        default: 0
    },

    description: {
        type: String
    },

    expiryDate: {
        type: Date
    },

    department: {
        type: String
    }

},
{
    timestamps: true
});


module.exports = mongoose.model("Product", productSchema);