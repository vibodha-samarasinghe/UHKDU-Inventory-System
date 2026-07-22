"use client";

import { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

import { useProducts } from "@/context/ProductContext";
import { useOrders } from "@/context/OrderContext";


const departments = [
  "Emergency Ward",
  "OPD",
  "ICU",
  "Pharmacy",
  "Surgical Ward"
];



export default function Scanner(){


const {products,setProducts}=useProducts();

const {addOrder}=useOrders();



const [scanResult,setScanResult]=useState("");

const [scannedProducts,setScannedProducts]=useState([]);

const [department,setDepartment]=useState("");





function handleScan(value){


setScanResult(value);



let barcode=value;



// QR JSON decode

try{

const data=JSON.parse(value);

barcode=data.barcode;


}

catch{

barcode=value;

}






const foundProduct=products.find(

item=>String(item.barcode)===String(barcode)

);





if(foundProduct){


setScannedProducts(prev=>{


const exists=prev.find(

item=>item.id===foundProduct.id

);



if(exists){

return prev;

}



return [

...prev,

{

...foundProduct,

issueQuantity:1

}

];


});


}



}







function updateQuantity(id,value){


setScannedProducts(prev=>

prev.map(product=>

product.id===id

?

{

...product,

issueQuantity:Number(value)

}

:

product

)

);


}









function issueAll(){



if(!department){

alert("Select Department");

return;

}



if(scannedProducts.length===0){

alert("Scan products first");

return;

}






let updatedProducts=[...products];






scannedProducts.forEach(product=>{


updatedProducts=

updatedProducts.map(item=>


item.id===product.id

?

{

...item,

quantity:

item.quantity-product.issueQuantity

}

:

item


);






addOrder({

id:Date.now()+product.id,

department,

product:product.name,

quantity:product.issueQuantity,

date:new Date().toLocaleDateString(),

status:"Completed"

});



});






setProducts(updatedProducts);



alert("Stock Issued Successfully");



setScannedProducts([]);

setDepartment("");



}









return(

<main className="
min-h-screen
pt-28
px-10
">



<div className="
max-w-4xl
mx-auto
bg-white/40
backdrop-blur-xl
border
border-white/50
shadow-xl
rounded-3xl
p-8
">



<h1 className="
text-3xl
font-bold
text-green-900
">

 QR Stock Scanner

</h1>


<p className="
text-gray-600
mt-2
">

Scan multiple hospital products

</p>






<div className="
mt-8
rounded-3xl
overflow-hidden
">


<BarcodeScannerComponent

width={500}

height={350}


onUpdate={(err,result)=>{


if(result){

handleScan(result.text);

}


}}


/>


</div>






<div className="
mt-6
bg-white/70
rounded-2xl
p-4
">


<h2 className="font-bold text-green-900">

Last Scan

</h2>


<p className="break-all text-sm">

{scanResult || "Waiting..."}

</p>


</div>









<div className="mt-8">


<h2 className="
text-2xl
font-bold
text-green-900
">

Scanned Products

</h2>





<div className="
space-y-4
mt-5
">


{

scannedProducts.length===0 &&

<p className="text-gray-600">

No products scanned

</p>

}





{

scannedProducts.map(product=>(


<div

key={product.id}

className="
bg-white/70
rounded-2xl
p-5
shadow
"


>


<h3 className="
text-xl
font-bold
text-green-900
">

{product.name}

</h3>



<p>
Category:
<b> {product.category}</b>
</p>



<p>
Available:
<b> {product.quantity}</b>
</p>




<p>
Barcode:
<b> {product.barcode}</b>
</p>





<input

className="
mt-3
w-full
p-3
border
rounded-xl
"

type="number"

min="1"

max={product.quantity}

value={product.issueQuantity}

onChange={(e)=>

updateQuantity(
product.id,
e.target.value
)

}


/>



</div>


))


}



</div>


</div>








<select

className="
w-full
mt-8
p-3
rounded-xl
border
"

value={department}

onChange={(e)=>setDepartment(e.target.value)}

>


<option value="">

Select Department

</option>


{

departments.map(dept=>(


<option

key={dept}

value={dept}

>

{dept}

</option>


))


}


</select>







<button

onClick={issueAll}

className="
mt-6
bg-green-800
text-white
px-8
py-3
rounded-full
hover:bg-green-900
"

>

Issue All Products

</button>






</div>


</main>


)

}