"use client";


import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";



export default function Navbar(){


const { user, logout } = useAuth();


const [open,setOpen] = useState(false);




const links = [

{
name:"Dashboard",
path:"/"
},

{
name:"Products",
path:"/products"
},


...(user

?

[

{
name:"Add Product",
path:"/add-product"
},

{
name:"Order History",
path:"/order-history"
},

{
name:"Stock Issue",
path:"/orders"
},

{
name:"Scanner",
path:"/scanner"
},

{
name:"Alerts",
path:"/alerts"
}

]

:

[])

];





return(

<nav className="
fixed
top-0
left-0
right-0
z-50
bg-white/40
backdrop-blur-xl
border-b
border-white/50
shadow-lg
">


<div className="
max-w-7xl
mx-auto
px-5
md:px-10
py-4
flex
justify-between
items-center
">





{/* Logo */}

<Link

href="/"

className="
text-xl
md:text-2xl
font-bold
text-green-900
"

>

🏥 UHKDU Inventory System

</Link>







{/* Desktop Menu */}

<div className="
hidden
md:flex
items-center
gap-6
">


{

links.map(link=>(


<Link

key={link.path}

href={link.path}

className="
text-gray-700
font-semibold
hover:text-green-800
"

>

{link.name}

</Link>


))

}







{

user &&

<>


<div className="
bg-green-100
text-green-900
px-4
py-2
rounded-full
font-semibold
">

{user.email}

</div>



<button

onClick={logout}

className="
bg-red-500
text-white
px-5
py-2
rounded-full
"

>

Logout

</button>


</>


}







{

!user &&

<Link

href="/login"

className="
bg-green-800
text-white
px-5
py-2
rounded-full
"

>

Login

</Link>


}


</div>









{/* Mobile Hamburger */}

<button

className="
md:hidden
text-3xl
text-green-900
"

onClick={()=>setOpen(!open)}

>

☰

</button>






</div>









{/* Mobile Menu */}

{

open &&

<div className="
md:hidden
bg-white/90
backdrop-blur-xl
px-5
py-5
space-y-4
shadow-lg
">


{

links.map(link=>(


<Link

key={link.path}

href={link.path}

onClick={()=>setOpen(false)}

className="
block
text-gray-700
font-semibold
"

>

{link.name}

</Link>


))


}






{

user &&

<button

onClick={()=>{

logout();

setOpen(false);

}}

className="
w-full
bg-red-500
text-white
py-3
rounded-full
"

>

Logout

</button>


}






{

!user &&

<Link

href="/login"

onClick={()=>setOpen(false)}

className="
block
text-center
bg-green-800
text-white
py-3
rounded-full
"

>

Login

</Link>


}



</div>


}




</nav>


)

}