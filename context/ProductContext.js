"use client";

import { createContext, useContext, useEffect, useState } from "react";


const ProductContext = createContext();


const API_URL = "http://localhost:8080/api/products";



export function ProductProvider({ children }) {


    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);



    // Load products when app starts
    useEffect(() => {

        fetchProducts();

    }, []);




    // GET ALL PRODUCTS
    async function fetchProducts() {

        try {

            setLoading(true);


            const res = await fetch(API_URL);


            if (!res.ok) {

                throw new Error("Failed to fetch products");

            }


            const data = await res.json();


            setProducts(data);


        } 
        
        catch (error) {

            console.log("Fetch Error:", error);

        } 
        
        finally {

            setLoading(false);

        }

    }






    // ADD PRODUCT
    async function addProduct(product) {


        try {


            const res = await fetch(

                API_URL,

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },


                    body: JSON.stringify({

                        name: product.name,

                        barcode: product.barcode,

                        category: product.category,

                        price: Number(product.price),

                        quantity: Number(product.quantity),

                        description: product.description || "",

                        expiry_date:
                        product.expiry_date || product.expiry

                    })


                }

            );



            const data = await res.json();


            console.log("Add Response:", data);



            // Refresh dashboard data
            fetchProducts();



        }


        catch(error) {


            console.log("Add Error:", error);


        }


    }







    // DELETE PRODUCT
    async function deleteProduct(id) {


        try {


            const res = await fetch(

                `${API_URL}/${id}`,

                {

                    method:"DELETE"

                }

            );



            const data = await res.json();


            console.log("Delete Response:",data);



            fetchProducts();


        }


        catch(error){


            console.log("Delete Error:",error);


        }


    }







    // UPDATE PRODUCT
    async function updateProduct(product) {


        try {


            const res = await fetch(

                `${API_URL}/${product.id}`,

                {

                    method:"PUT",

                    headers:{

                        "Content-Type":"application/json"

                    },


                    body:JSON.stringify({

                        name:product.name,

                        barcode:product.barcode,

                        category:product.category,

                        price:Number(product.price),

                        quantity:Number(product.quantity),

                        expiry_date:
                        product.expiry_date


                    })


                }

            );



            const data = await res.json();


            console.log("Update Response:",data);



            fetchProducts();


        }


        catch(error){


            console.log("Update Error:",error);


        }


    }






    return (

        <ProductContext.Provider

            value={{

                products,

                loading,

                setProducts,

                fetchProducts,

                addProduct,

                deleteProduct,

                updateProduct

            }}

        >

            {children}


        </ProductContext.Provider>


    );


}






export function useProducts(){

    return useContext(ProductContext);

}