"use client";

import { createContext, useContext, useEffect, useState } from "react";


const OrderContext = createContext();



export function OrderProvider({children}){


const [orders,setOrders] = useState([]);




// Load Orders

useEffect(()=>{


const savedOrders = localStorage.getItem(
"uhkdu_orders"
);


if(savedOrders){

setOrders(JSON.parse(savedOrders));

}


},[]);






// Save Orders

useEffect(()=>{


localStorage.setItem(

"uhkdu_orders",

JSON.stringify(orders)

);


},[orders]);







// Add Order

function addOrder(order){


setOrders(prevOrders=>[

...prevOrders,

order

]);


}






return(

<OrderContext.Provider

value={{

orders,

addOrder

}}

>

{children}

</OrderContext.Provider>


)

}





export function useOrders(){

return useContext(OrderContext);

}