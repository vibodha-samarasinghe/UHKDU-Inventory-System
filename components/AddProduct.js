"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";


export default function AddProduct(){


const [product,setProduct] = useState({

name:"",
category:"",
barcode:"",
quantity:"",
price:"",
expiry_date:""

});


const [qrData,setQrData] = useState("");



function handleChange(e){

setProduct({

...product,

[e.target.name]: e.target.value

});

}




function generateQR(){


setQrData(JSON.stringify({

name:product.name,

barcode:product.barcode,

category:product.category,

quantity:product.quantity


}));


}





async function saveProduct(){


try{


const response = await fetch(

"http://localhost:5001/api/products",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

name:product.name,

barcode:product.barcode,

category:product.category,

price:Number(product.price),

quantity:Number(product.quantity),

description:"",

expiry_date:product.expiry_date


})


}

);



const data = await response.json();



if(response.ok){


alert("Product Added Successfully");


// clear form

setProduct({

name:"",

category:"",

barcode:"",

quantity:"",

price:"",

expiry_date:""

});


// refresh QR

setQrData("");


}

else{


alert(data.error);


}



}

catch(error){


console.log(error);


alert("Backend Connection Error");


}



}







return(


<div className="
min-h-screen
pt-28
px-4
sm:px-6
flex
justify-center
bg-gradient-to-br
from-green-50
via-white
to-green-100
">


<div className="
bg-white/70
backdrop-blur-xl
border
border-white
shadow-xl
rounded-3xl
p-6
sm:p-8
max-w-xl
w-full
">



<h1 className="
text-2xl
sm:text-3xl
font-bold
text-green-900
mb-6
text-center
">

Add New Product

</h1>





<input

className="
w-full
p-3
mb-4
rounded-xl
border
"

name="name"

placeholder="Product Name"

value={product.name}

onChange={handleChange}

/>





<input

className="
w-full
p-3
mb-4
rounded-xl
border
"

name="category"

placeholder="Category"

value={product.category}

onChange={handleChange}

/>






<input

className="
w-full
p-3
mb-4
rounded-xl
border
"

name="barcode"

placeholder="Barcode"

value={product.barcode}

onChange={handleChange}

/>







<input

className="
w-full
p-3
mb-4
rounded-xl
border
"

type="number"

name="quantity"

placeholder="Quantity"

value={product.quantity}

onChange={handleChange}

/>







<input

className="
w-full
p-3
mb-4
rounded-xl
border
"

type="number"

name="price"

placeholder="Price"

value={product.price}

onChange={handleChange}

/>







<input

className="
w-full
p-3
mb-6
rounded-xl
border
"

type="date"

name="expiry_date"

value={product.expiry_date}

onChange={handleChange}

/>









<div className="
flex
flex-col
sm:flex-row
gap-4
">





<button

onClick={generateQR}

className="
bg-green-800
text-white
px-6
py-3
rounded-full
hover:bg-green-900
"

>

Generate QR

</button>







<button

onClick={saveProduct}

className="
bg-green-600
text-white
px-6
py-3
rounded-full
hover:bg-green-700
"

>

Save Product

</button>





</div>









{

qrData &&


<div className="
mt-8
text-center
">


<h2 className="
font-bold
mb-4
text-green-900
">

Product QR

</h2>





<QRCodeCanvas

value={qrData}

size={200}

/>



</div>



}





</div>


</div>


)


}