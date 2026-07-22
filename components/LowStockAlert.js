"use client";


export default function LowStockAlert({products}){


const lowStockProducts = products.filter(
product => product.quantity < 100
);



return (

<div className="
mt-10
bg-white/40
backdrop-blur-xl
border
border-white/50
shadow-xl
rounded-3xl
p-8
">


<h2 className="
text-2xl
font-bold
text-red-700
">

⚠️ Low Stock Alerts

</h2>



{

lowStockProducts.length === 0 ?


<p className="
mt-5
text-gray-600
">

All products have enough stock ✅

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

)

}