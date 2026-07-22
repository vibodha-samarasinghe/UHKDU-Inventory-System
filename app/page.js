"use client";


import { useProducts } from "@/context/ProductContext";

import InventoryCharts from "@/components/InventoryCharts";

import ProtectedRoute from "@/components/ProtectedRoute";

import PDFReport from "@/components/PDFReport";



export default function Home(){



const { products = [] } = useProducts();





const totalQuantity = products.reduce(

(total, product)=> total + product.quantity,

0

);





const lowStock = products.filter(

product => product.quantity < 100

);







return(


<ProtectedRoute>


<main className="
min-h-screen
pt-28
px-10
">





<h1 className="
text-4xl
font-bold
text-green-800
">

University Hospital KDU Inventory Dashboard

</h1>




<p className="
mt-2
text-gray-600
">

Smart Hospital Inventory Management System

</p>









{/* Dashboard Cards */}



<div className="
grid
md:grid-cols-3
gap-8
mt-10
">






{/* Total Products */}



<div className="
bg-white/40
backdrop-blur-xl
border
border-white/50
shadow-xl
rounded-3xl
p-8
">


<h2 className="text-gray-600">

Total Products

</h2>



<p className="
text-5xl
font-bold
text-green-700
mt-3
">

{products.length}

</p>



</div>









{/* Total Quantity */}



<div className="
bg-white/40
backdrop-blur-xl
border
border-white/50
shadow-xl
rounded-3xl
p-8
">


<h2 className="text-gray-600">

Total Stock Quantity

</h2>



<p className="
text-5xl
font-bold
text-green-700
mt-3
">

{totalQuantity}

</p>



</div>









{/* Low Stock */}



<div className="
bg-white/40
backdrop-blur-xl
border
border-white/50
shadow-xl
rounded-3xl
p-8
">


<h2 className="text-gray-600">

Low Stock Items

</h2>




<p className="
text-5xl
font-bold
text-red-500
mt-3
">

{lowStock.length}

</p>



</div>





</div>









{/* PDF REPORT BUTTON */}



<div className="mt-10">


<PDFReport

products={products}

/>


</div>









{/* Charts */}



<div className="mt-10">


<InventoryCharts

products={products}

/>


</div>









{/* Recent Inventory */}



<div

className="
mt-10
bg-white/40
backdrop-blur-xl
border
border-white/50
shadow-xl
rounded-3xl
p-8
"

>



<h2 className="
text-2xl
font-bold
text-green-800
">

Recent Inventory

</h2>









<div className="
mt-5
space-y-4
">





{

products.map(product=>(



<div

key={product.id}

className="
bg-white/50
rounded-2xl
p-4
flex
justify-between
items-center
"

>





<div>


<h3 className="
font-bold
text-lg
">

{product.name}

</h3>




<p className="
text-gray-600
">

{product.category}

</p>



</div>








<div className="
text-right
">


<p className="
font-bold
text-green-700
">

Qty: {product.quantity}

</p>




<p>

Rs. {product.price}

</p>



{

product.expiry &&

<p className="
text-sm
text-gray-500
">

Expiry: {product.expiry}

</p>

}



</div>





</div>



))


}





</div>







</div>








</main>


</ProtectedRoute>



)


}