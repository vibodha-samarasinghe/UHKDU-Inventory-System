"use client";


import { useState } from "react";

import ProductCard from "@/components/ProductCard";

import QRLabel from "@/components/QRLabel";

import { useProducts } from "@/context/ProductContext";



export default function Products(){


const { products = [], loading } = useProducts();



const [search,setSearch] = useState("");

const [category,setCategory] = useState("All");


const [selectedProduct,setSelectedProduct] = useState(null);





if(loading){

return (

<main className="
min-h-screen
pt-28
flex
justify-center
items-center
text-white
text-xl
font-bold
">

Loading Products...

</main>

);

}






const categories = [

"All",

...new Set(

products

.map(product=>product.category)

.filter(Boolean)

)

];








const filteredProducts = products.filter(product=>{


const matchSearch = product.name

.toLowerCase()

.includes(search.toLowerCase());



const matchCategory =

category === "All"

?

true

:

product.category === category;



return matchSearch && matchCategory;



});







return(


<main

className="
min-h-screen
pt-28
px-4
sm:px-10
"

>







<h1

className="
text-3xl
sm:text-4xl
font-bold
text-white
"

>

Hospital Products

</h1>






<p

className="
text-green-100
mt-2
"

>

Manage UHKDU Hospital Inventory Products

</p>









{/* Search */}


<div

className="
flex
gap-5
mt-8
flex-wrap
"

>





<input


className="
p-4
rounded-xl
border
w-full
sm:w-80
bg-white/70
backdrop-blur-xl
outline-none
"


placeholder="Search Product..."


value={search}


onChange={(e)=>setSearch(e.target.value)}


/>







<select


className="
p-4
rounded-xl
border
bg-white/70
backdrop-blur-xl
"


value={category}


onChange={(e)=>setCategory(e.target.value)}


>


{

categories.map(cat=>(


<option

key={cat}

value={cat}

>

{cat}

</option>


))

}


</select>






</div>









{/* Product Cards */}



<div

className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-8
mt-10
"

>





{

filteredProducts.length === 0 ?


(

<div

className="
text-white
text-xl
"

>

No Products Found

</div>


)


:


filteredProducts.map(product=>(



<div

key={product._id || product.id}

className="
bg-white/25
backdrop-blur-xl
border
border-white/30
rounded-3xl
p-5
shadow-2xl
"

>





{

product.quantity < 100 &&


<div

className="
bg-red-500/80
text-white
px-4
py-2
rounded-xl
mb-3
font-semibold
"

>

⚠️ Low Stock

</div>


}







<ProductCard

product={product}

/>







<button


onClick={()=>setSelectedProduct(product)}


className="
mt-4
bg-green-700
text-white
px-6
py-3
rounded-full
hover:bg-green-800
w-full
"

>

🏷️ Generate QR Label

</button>







</div>



))


}





</div>









{

selectedProduct &&



<div

className="
mt-10
bg-white/25
backdrop-blur-xl
border
border-white/30
rounded-3xl
p-6
shadow-2xl
max-w-md
"

>


<h2

className="
text-xl
font-bold
text-white
mb-4
"

>

QR Preview

</h2>



<QRLabel

product={selectedProduct}

/>



</div>



}





</main>



)


}