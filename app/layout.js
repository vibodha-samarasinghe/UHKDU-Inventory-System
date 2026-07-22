import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { ProductProvider } from "@/context/ProductContext";
import { AuthProvider } from "@/context/AuthContext";
import { OrderProvider } from "@/context/OrderContext";



export const metadata = {

  title: "UHKDU System",

  description: "University Hospital KDU Inventory System",

};



export const viewport = {

  width: "device-width",

  initialScale: 1,

};





export default function RootLayout({children}){


return(

<html lang="en">


<body className="
bg-gradient-to-br
from-green-50
via-white
to-green-100
min-h-screen
overflow-x-hidden
">



<AuthProvider>


<ProductProvider>


<OrderProvider>


<Navbar />


{children}


<Footer />


</OrderProvider>


</ProductProvider>


</AuthProvider>



</body>


</html>


)

}