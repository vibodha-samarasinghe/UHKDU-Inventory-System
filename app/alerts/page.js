"use client";


import { useProducts } from "@/context/ProductContext";



export default function Alerts(){



const { products = [] } = useProducts();





const today = new Date();





const lowStockProducts = products.filter(

product => product.quantity < 100

);







const expiryProducts = products.filter(product=>{


if(!product.expiry) return false;



const expiryDate = new Date(product.expiry);



const daysLeft =

(expiryDate - today) /

(1000 * 60 * 60 * 24);



return daysLeft <= 30;


});








return(


<main className="
min-h-screen
pt-28
px-10
">





<h1 className="
text-4xl
font-bold
text-green-900
">

⚠️ Inventory Alerts

</h1>


<p className="
text-gray-600
mt-2
">

Hospital Stock Monitoring System

</p>








{/* Low Stock */}



<div className="
mt-10
bg-white/40
backdrop-blur-xl
border
rounded-3xl
shadow-xl
p-8
">



<h2 className="
text-2xl
font-bold
text-red-700
">

Low Stock Products

</h2>







{

lowStockProducts.length === 0 ?



<p className="mt-5 text-gray-600">

No low stock products ✅

</p>





:



<div className="
mt-5
space-y-4
">



{

lowStockProducts.map(product=>(


<div

key={product.id}

className="
bg-red-100
rounded-2xl
p-5
flex
justify-between
"

>


<div>

<h3 className="
font-bold
text-red-800
">

{product.name}

</h3>


<p>

Category: {product.category}

</p>


</div>




<div>

<p className="
font-bold
text-red-600
">

Qty: {product.quantity}

</p>


</div>



</div>


))


}



</div>



}




</div>









{/* Expiry */}



<div className="
mt-10
bg-white/40
backdrop-blur-xl
border
rounded-3xl
shadow-xl
p-8
">



<h2 className="
text-2xl
font-bold
text-orange-700
">

📅 Expiry Alerts

</h2>






{

expiryProducts.length === 0 ?



<p className="mt-5 text-gray-600">

No expiry alerts ✅

</p>





:



<div className="
mt-5
space-y-4
">



{

expiryProducts.map(product=>(


<div

key={product.id}

className="
bg-orange-100
rounded-2xl
p-5
"

>


<h3 className="
font-bold
text-orange-800
">

{product.name}

</h3>


<p>

Expiry Date:

<b> {product.expiry}</b>

</p>


</div>


))


}



</div>



}




</div>








</main>


)


}