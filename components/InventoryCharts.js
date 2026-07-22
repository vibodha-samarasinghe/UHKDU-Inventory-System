"use client";

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
PieChart,
Pie,
Cell,
Legend
} from "recharts";


export default function InventoryCharts({products}){



const stockData = products.map(product=>({

name: product.name,
quantity: product.quantity

}));



const categoryCount = {};


products.forEach(product=>{

if(categoryCount[product.category]){

categoryCount[product.category]++;

}
else{

categoryCount[product.category]=1;

}

});



const categoryData = Object.keys(categoryCount).map(category=>({

name: category,

value: categoryCount[category]

}));





return(


<div className="
grid
md:grid-cols-2
gap-8
mt-10
">



{/* Stock Chart */}


<div className="
bg-white/40
backdrop-blur-xl
border border-white/50
shadow-xl
rounded-3xl
p-6
">


<h2 className="
text-xl
font-bold
text-green-900
mb-5
">

Stock Overview

</h2>



<BarChart

width={450}

height={300}

data={stockData}

>


<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>


<Bar

dataKey="quantity"

fill="#166534"

/>


</BarChart>



</div>







{/* Category Chart */}



<div className="
bg-white/40
backdrop-blur-xl
border border-white/50
shadow-xl
rounded-3xl
p-6
">


<h2 className="
text-xl
font-bold
text-green-900
mb-5
">

Category Distribution

</h2>




<PieChart

width={400}

height={300}

>


<Pie

data={categoryData}

dataKey="value"

nameKey="name"

cx="50%"

cy="50%"

outerRadius={100}

label

>


{
categoryData.map((entry,index)=>(

<Cell

key={index}

fill={
[
"#166534",
"#22c55e",
"#86efac"
][index % 3]
}

/>

))

}


</Pie>



<Legend/>

<Tooltip/>


</PieChart>




</div>



</div>


)


}