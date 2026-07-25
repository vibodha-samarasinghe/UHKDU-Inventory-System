"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useProducts } from "@/context/ProductContext";


export default function ProductCard({ product }) {


    const { fetchProducts } = useProducts();


    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/products`;


    const [showQR, setShowQR] = useState(false);

    const [editMode, setEditMode] = useState(false);



    const [editedProduct, setEditedProduct] = useState({

        ...product,

        expiry_date: product.expiry_date
            ?
            product.expiry_date.substring(0, 10)
            :
            ""

    });





    function handleChange(e) {


        setEditedProduct({

            ...editedProduct,

            [e.target.name]: e.target.value

        });


    }







    // UPDATE PRODUCT

    async function saveEdit() {


        try {


            const response = await fetch(

                `${API_URL}/${product.id}`,

                {

                    method: "PUT",

                    headers: {

                        "Content-Type": "application/json"

                    },


                    body: JSON.stringify({

                        ...editedProduct,

                        quantity: Number(editedProduct.quantity),

                        price: Number(editedProduct.price)

                    })


                }

            );





            if (response.ok) {


                alert("Product Updated Successfully");


                setEditMode(false);


                fetchProducts();


            }


        }


        catch (error) {


            console.log(error);

            alert("Update Failed");


        }


    }









    // DELETE PRODUCT

    async function deleteProduct() {


        const confirmDelete = window.confirm(

            "Delete this product?"

        );



        if (!confirmDelete) return;





        try {


            const response = await fetch(

                `${API_URL}/${product.id}`,

                {

                    method: "DELETE"

                }

            );






            if (response.ok) {


                alert("Product Deleted Successfully");


                fetchProducts();


            }



        }


        catch (error) {


            console.log(error);

            alert("Delete Failed");


        }


    }









    return (


        <div className="
        bg-white/70
        backdrop-blur-xl
        border
        border-white
        shadow-xl
        rounded-3xl
        p-6
        hover:scale-105
        transition
        ">




            {


                editMode ?


                    (


                        <div>


                            <h2 className="
                            text-2xl
                            font-bold
                            text-green-900
                            mb-4
                            ">

                                Edit Product

                            </h2>





                            <input

                                className="w-full p-3 mb-3 border rounded-xl"

                                name="name"

                                value={editedProduct.name}

                                onChange={handleChange}

                            />





                            <input

                                className="w-full p-3 mb-3 border rounded-xl"

                                name="category"

                                value={editedProduct.category}

                                onChange={handleChange}

                            />





                            <input

                                className="w-full p-3 mb-3 border rounded-xl"

                                name="barcode"

                                value={editedProduct.barcode}

                                onChange={handleChange}

                            />





                            <input

                                className="w-full p-3 mb-3 border rounded-xl"

                                type="number"

                                name="quantity"

                                value={editedProduct.quantity}

                                onChange={handleChange}

                            />





                            <input

                                className="w-full p-3 mb-3 border rounded-xl"

                                type="number"

                                name="price"

                                value={editedProduct.price}

                                onChange={handleChange}

                            />





                            <input

                                className="w-full p-3 mb-3 border rounded-xl"

                                type="date"

                                name="expiry_date"

                                value={editedProduct.expiry_date}

                                onChange={handleChange}

                            />





                            <div className="flex gap-3">


                                <button

                                    onClick={saveEdit}

                                    className="
                                    bg-green-800
                                    text-white
                                    px-5
                                    py-2
                                    rounded-full
                                    "

                                >

                                    Save

                                </button>




                                <button

                                    onClick={() => setEditMode(false)}

                                    className="
                                    bg-gray-400
                                    text-white
                                    px-5
                                    py-2
                                    rounded-full
                                    "

                                >

                                    Cancel

                                </button>



                            </div>


                        </div>


                    )



                    :



                    (


                        <>


                            <h2 className="
                            text-2xl
                            font-bold
                            text-green-900
                            ">

                                {product.name}

                            </h2>





                            <div className="
                            mt-4
                            space-y-2
                            text-gray-700
                            ">


                                <p>
                                    Category: {product.category}
                                </p>


                                <p>
                                    Barcode: {product.barcode}
                                </p>



                                <p>
                                    Quantity:
                                    <span className="font-bold text-green-800">
                                        {product.quantity}
                                    </span>
                                </p>



                                <p>
                                    Price: Rs.{product.price}
                                </p>




                                <p>

                                    Expiry:

                                    {
                                        product.expiry_date
                                            ?
                                            new Date(product.expiry_date)
                                                .toISOString()
                                                .substring(0, 10)

                                            :

                                            "Not Set"
                                    }

                                </p>


                            </div>









                            <div className="
                            flex
                            gap-3
                            mt-5
                            flex-wrap
                            ">





                                <button

                                    onClick={() => setShowQR(!showQR)}

                                    className="
                                    bg-green-800
                                    text-white
                                    px-4
                                    py-2
                                    rounded-full
                                    "

                                >

                                    {
                                        showQR
                                            ?
                                            "Hide QR"
                                            :
                                            "View QR"
                                    }


                                </button>






                                <button

                                    onClick={() => setEditMode(true)}

                                    className="
                                    bg-blue-600
                                    text-white
                                    px-4
                                    py-2
                                    rounded-full
                                    "

                                >

                                    Edit

                                </button>






                                <button

                                    onClick={deleteProduct}

                                    className="
                                    bg-red-500
                                    text-white
                                    px-4
                                    py-2
                                    rounded-full
                                    "

                                >

                                    Delete

                                </button>





                            </div>








                            {

                                showQR &&


                                <div className="
                                mt-6
                                text-center
                                ">


                                    <QRCodeCanvas

                                        value={JSON.stringify(product)}

                                        size={180}

                                    />



                                </div>


                            }




                        </>


                    )


            }





        </div>


    );


}