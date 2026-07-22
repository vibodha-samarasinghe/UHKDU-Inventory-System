const db = require("../config/db");


// Get All Products
exports.getProducts = (req, res) => {

    const sql = "SELECT * FROM products";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(result);

    });

};




// Add Product
exports.addProduct = (req, res) => {

    const {
        name,
        barcode,
        category,
        price,
        quantity,
        description,
        expiry_date
    } = req.body;


    const sql = `
    INSERT INTO products
    (name, barcode, category, price, quantity, description, expiry_date)
    VALUES (?,?,?,?,?,?,?)
    `;


    db.query(
        sql,
        [
            name,
            barcode,
            category,
            price,
            quantity,
            description,
            expiry_date
        ],

        (err,result)=>{

            if(err){

                return res.status(500).json({
                    error:err.message
                });

            }


            res.json({

                message:"Product Added Successfully",

                id:result.insertId

            });


        }
    );


};






// Update Full Product
exports.updateQuantity = (req,res)=>{


    const {id}=req.params;


    const {
        name,
        barcode,
        category,
        price,
        quantity,
        expiry_date

    } = req.body;



    const sql = `

    UPDATE products SET

    name=?,
    barcode=?,
    category=?,
    price=?,
    quantity=?,
    expiry_date=?

    WHERE id=?

    `;



    db.query(

        sql,

        [
            name,
            barcode,
            category,
            price,
            quantity,
            expiry_date,
            id
        ],


        (err)=>{


            if(err){

                return res.status(500).json({
                    error:err.message
                });

            }



            res.json({

                message:"Product Updated Successfully"

            });



        }

    );


};






// Delete Product
exports.deleteProduct = (req,res)=>{


    const {id}=req.params;



    db.query(

        "DELETE FROM products WHERE id=?",

        [id],


        (err)=>{


            if(err){

                return res.status(500).json({
                    error:err.message
                });

            }



            res.json({

                message:"Product Deleted Successfully"

            });



        }


    );


};