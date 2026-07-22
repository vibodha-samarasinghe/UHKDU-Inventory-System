"use client";


import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";



export default function PDFReport({products}){



function downloadPDF(){


const doc = new jsPDF();



doc.setFontSize(18);

doc.text(
"University Hospital KDU Inventory Report",
14,
20
);




doc.setFontSize(12);

doc.text(
"Smart Hospital Inventory Management System",
14,
30
);






const tableData = products.map(product=>[

product.name,

product.category,

product.quantity,

`Rs.${product.price}`,

product.expiry || "N/A"

]);







autoTable(doc,{

startY:40,

head:[

[
"Product",
"Category",
"Quantity",
"Price",
"Expiry"
]

],


body:tableData


});







doc.save(
"UHKDU_Inventory_Report.pdf"
);



}






return(

<button

onClick={downloadPDF}

className="
bg-green-800
text-white
px-6
py-3
rounded-full
hover:bg-green-900
transition
"

>

Download Inventory Report

</button>


)


}