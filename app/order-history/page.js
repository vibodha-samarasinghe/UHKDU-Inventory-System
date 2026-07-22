"use client";

import { useOrders } from "@/context/OrderContext";


export default function OrderHistory(){


const {orders}=useOrders();



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

Order History

</h1>


<p className="text-gray-600 mt-2">
Hospital Stock Issue Records
</p>





<div className="
mt-10
space-y-5
">


{

orders.length === 0 ?


<div className="
bg-white/40
backdrop-blur-xl
rounded-3xl
shadow-xl
p-8
text-center
">


<h2 className="
text-xl
font-bold
text-gray-700
">

No Stock Issue Records

</h2>


<p className="text-gray-500 mt-2">

Issue products from Stock Issue page to see history here.

</p>


</div>



:


orders.map((order)=>(


<div

key={order.id}

className="
bg-white/40
backdrop-blur-xl
border border-white/50
rounded-3xl
shadow-xl
p-6
"

>


<h2 className="
text-xl
font-bold
text-green-900
">

{order.product}

</h2>


<p className="mt-2">
Department:
<span className="font-semibold">
 {order.department}
</span>
</p>


<p>
Quantity:
<span className="font-semibold">
 {order.quantity}
</span>
</p>


<p>
Date:
<span className="font-semibold">
 {order.date}
</span>
</p>


<p className="
text-green-700
font-bold
mt-2
">

Status: Completed

</p>



</div>


))


}



</div>



</main>

)

}