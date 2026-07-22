"use client";


import { QRCodeCanvas } from "qrcode.react";



export default function QRLabel({product}){


if(!product){

return null;

}



const qrData = JSON.stringify({

id: product.id,

name: product.name,

category: product.category,

barcode: product.barcode,

quantity: product.quantity,

price: product.price,

expiry: product.expiry


});







function printLabel(){


window.print();


}







return(


<div className="
bg-white
rounded-3xl
shadow-xl
p-6
w-fit
">


<h2 className="
text-xl
font-bold
text-green-900
mb-4
">

Product QR Label

</h2>







<div id="print-area">


<QRCodeCanvas

value={qrData}

size={180}

/>






<div className="
mt-4
text-sm
">

<p>

<b>Product:</b> {product.name}

</p>


<p>

<b>Category:</b> {product.category}

</p>


<p>

<b>Barcode:</b> {product.barcode}

</p>


<p>

<b>Expiry:</b> {product.expiry}

</p>



</div>


</div>







<button

onClick={printLabel}

className="
mt-5
bg-green-800
text-white
px-6
py-3
rounded-full
hover:bg-green-900
"

>

Print Label

</button>





</div>


)


}