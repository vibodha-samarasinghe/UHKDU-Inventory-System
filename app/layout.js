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


<body

className="
min-h-screen
overflow-x-hidden
relative
bg-cover
bg-center
bg-fixed
"

style={{

backgroundImage:"url('/UHKDU.png')"

}}

>



{/* Green Overlay */}

<div

className="
fixed
inset-0
bg-green-900/60
z-0
"

/>





<div className="relative z-10">



<AuthProvider>


<ProductProvider>


<OrderProvider>



<Navbar />


{children}



<Footer />


</OrderProvider>


</ProductProvider>


</AuthProvider>



</div>



</body>


</html>


)

}