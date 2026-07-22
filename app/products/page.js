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





// Loading

if(loading){

return (

<main className="
min-h-screen
pt-28
flex
justify-center
items-center
text-green-900
text-xl
font-bold
">

Loading Products...

</main>

);

}







// Categories

const categories = [

"All",

...new Set(

products

.map(product=>product.category)

.filter(Boolean)

)

];









// Search + Filter

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


<main className="
min-h-screen
pt-28
px-4
sm:px-10
bg-gradient-to-br
from-green-50
via-white
to-green-100
">







<h1 className="
text-3xl
sm:text-4xl
font-bold
text-green-900
">

Hospital Products

</h1>





<p className="
text-gray-600
mt-2
">

Manage UHKDU Hospital Inventory Products

</p>









{/* Search + Filter */}



<div className="
flex
gap-5
mt-8
flex-wrap
">






<input


className="
p-4
rounded-xl
border
w-full
sm:w-80
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









{/* Products Grid */}



<div className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-8
mt-10
">





{

filteredProducts.length === 0 ?


(


<div className="
text-gray-600
text-xl
">

No Products Found

</div>


)


:



filteredProducts.map(product=>(



<div key={product.id}>




{

product.quantity < 100 &&



<div className="
bg-red-100
text-red-700
px-4
py-2
rounded-xl
mb-3
font-semibold
">

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
bg-green-800
text-white
px-6
py-3
rounded-full
hover:bg-green-900
w-full
"

>

🏷️ Generate QR Label

</button>







</div>



))


}





</div>









{/* QR Preview */}



{

selectedProduct &&



<div className="
mt-10
bg-white/70
backdrop-blur-xl
rounded-3xl
p-6
shadow-xl
max-w-md
">


<h2 className="
text-xl
font-bold
text-green-900
mb-4
">

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