"use client";


import { useState } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

import { FcGoogle } from "react-icons/fc";




export default function Login(){



const router = useRouter();



const {

login,

register,

googleLogin

} = useAuth();





const [email,setEmail] = useState("");

const [password,setPassword] = useState("");

const [isRegister,setIsRegister] = useState(false);









async function handleSubmit(){


try{


if(isRegister){


await register(

email,

password

);



alert("Account Created Successfully");



setIsRegister(false);



}

else{


await login(

email,

password

);



router.push("/");



}




}

catch(error){


alert(error.message);



}



}









async function handleGoogle(){



try{


await googleLogin();


router.push("/");



}

catch(error){


alert(error.message);



}


}










return(


<main className="
min-h-screen
flex
items-center
justify-center
bg-gradient-to-br
from-green-50
via-white
to-green-100
">







<div className="
w-96
bg-white/40
backdrop-blur-xl
border
border-white/50
shadow-xl
rounded-3xl
p-10
">







<h1 className="
text-3xl
font-bold
text-green-900
text-center
mb-8
">


{

isRegister

?

"Create Account"

:

"Welcome Back"

}


</h1>









<input

className="
w-full
p-3
rounded-xl
border
mb-4
bg-white/70
"

type="email"

placeholder="Email Address"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>










<input

className="
w-full
p-3
rounded-xl
border
mb-5
bg-white/70
"

type="password"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>









<button

onClick={handleSubmit}

className="
w-full
bg-green-800
text-white
py-3
rounded-full
font-semibold
hover:bg-green-900
transition
"

>


{

isRegister

?

"Create Account"

:

"Login"

}


</button>









<div className="
flex
items-center
gap-3
my-6
">


<div className="flex-1 h-px bg-gray-300"></div>


<span className="text-gray-500">

OR

</span>


<div className="flex-1 h-px bg-gray-300"></div>


</div>









<button

onClick={handleGoogle}

className="
w-full
bg-white
border
py-3
rounded-full
font-semibold
flex
items-center
justify-center
gap-3
hover:bg-gray-100
transition
"

>


<FcGoogle size={26}/>


Continue with Google


</button>









<button

onClick={()=>setIsRegister(!isRegister)}

className="
mt-6
w-full
text-green-800
font-semibold
"

>


{

isRegister

?

"Already have an account? Login"

:

"New user? Create Account"

}



</button>







</div>







</main>


)


}