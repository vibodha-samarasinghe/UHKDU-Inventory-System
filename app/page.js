"use client";


import { useProducts } from "@/context/ProductContext";

import InventoryCharts from "@/components/InventoryCharts";

import ProtectedRoute from "@/components/ProtectedRoute";

import PDFReport from "@/components/PDFReport";



export default function Home(){


const { products = [] } = useProducts();



const totalQuantity = products.reduce(

(total, product)=> total + Number(product.quantity || 0),

0

);



const lowStock = products.filter(

product => product.quantity < 100

);





return(


<ProtectedRoute>


<main

className="
min-h-screen
pt-28
px-6
md:px-10
relative
bg-cover
bg-center
"

style={{

backgroundImage:"url('/UHKDU.png')"

}}

>


{/* Green Overlay */}

<div

className="
absolute
inset-0
bg-green-900/60
"

/>





<div

className="
relative
z-10
"

>





<h1

className="
text-3xl
md:text-5xl
font-bold
text-white
"

>

University Hospital KDU
Inventory Dashboard

</h1>





<p

className="
mt-3
text-lg
text-green-100
"

>

Smart Hospital Inventory Management System

</p>










{/* Cards */}


<div

className="
grid
md:grid-cols-3
gap-8
mt-10
"

>





<div

className="
bg-white/25
backdrop-blur-xl
border
border-white/30
shadow-2xl
rounded-3xl
p-8
text-white
"

>

<h2 className="text-green-100">

Total Products

</h2>


<p

className="
text-5xl
font-bold
mt-3
"

>

{products.length}

</p>


</div>









<div

className="
bg-white/25
backdrop-blur-xl
border
border-white/30
shadow-2xl
rounded-3xl
p-8
text-white
"

>


<h2 className="text-green-100">

Total Stock Quantity

</h2>


<p

className="
text-5xl
font-bold
mt-3
"

>

{totalQuantity}

</p>


</div>









<div

className="
bg-white/25
backdrop-blur-xl
border
border-white/30
shadow-2xl
rounded-3xl
p-8
text-white
"

>


<h2 className="text-green-100">

Low Stock Items

</h2>


<p

className="
text-5xl
font-bold
text-red-300
mt-3
"

>

{lowStock.length}

</p>


</div>





</div>









{/* PDF Button */}

<div className="mt-10">

<PDFReport

products={products}

/>

</div>









{/* Charts */}

<div

className="
mt-10
bg-white/25
backdrop-blur-xl
border
border-white/30
rounded-3xl
p-6
"

>

<InventoryCharts

products={products}

/>

</div>









{/* Recent Inventory */}


<div

className="
mt-10
bg-white/25
backdrop-blur-xl
border
border-white/30
shadow-2xl
rounded-3xl
p-8
"

>



<h2

className="
text-2xl
font-bold
text-white
"

>

Recent Inventory

</h2>







<div

className="
mt-5
space-y-4
"

>



{

products.map(product=>(


<div

key={product._id || product.id}

className="
bg-white/30
backdrop-blur-md
rounded-2xl
p-5
flex
justify-between
items-center
text-white
"

>




<div>

<h3

className="
font-bold
text-lg
"

>

{product.name}

</h3>


<p className="text-green-100">

{product.category}

</p>


</div>







<div className="text-right">


<p className="font-bold">

Qty: {product.quantity}

</p>


<p>

Rs. {product.price}

</p>



{

product.expiryDate &&

<p className="text-sm text-green-100">

Expiry:
{new Date(product.expiryDate).toLocaleDateString()}

</p>

}



</div>






</div>


))


}





</div>







</div>




</div>




</main>


</ProtectedRoute>


)


}