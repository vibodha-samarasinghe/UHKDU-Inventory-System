"use client";


export default function ExpiryAlert({products}){


const today = new Date();



const expiryProducts = products.filter(product=>{


const expiryDate = new Date(product.expiry);


const difference =
(expiryDate - today) /
(1000 * 60 * 60 * 24);



return difference <= 30;


});





return(


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
text-orange-700
">

📅 Expiry Date Alerts

</h2>





{

expiryProducts.length === 0 ?



<p className="
mt-5
text-gray-600
">

No upcoming expiry products ✅

</p>





:



<div className="
mt-5
space-y-4
">





{

expiryProducts.map(product=>{


const expiryDate = new Date(product.expiry);

const isExpired = expiryDate < today;



return(


<div

key={product.id}

className={

isExpired

?

"bg-red-100 rounded-2xl p-5"

:

"bg-orange-100 rounded-2xl p-5"

}

>


<h3 className="
font-bold
text-lg
">

{product.name}

</h3>



<p>

Expiry Date:

<b> {product.expiry}</b>

</p>




<p className="
font-bold
mt-2
">

{

isExpired

?

"❌ Expired"

:

"⚠️ Expiring Soon"

}


</p>



</div>


)


})


}



</div>


}



</div>


)

}