"use client";


import { 
createContext,
useContext,
useEffect,
useState
} from "react";


import {
onAuthStateChanged,
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
signInWithPopup,
signOut
} from "firebase/auth";


import {
auth,
googleProvider
} from "@/lib/firebase";



const AuthContext = createContext();





export function AuthProvider({children}){



const [user,setUser] = useState(null);

const [loading,setLoading] = useState(true);






// Check login status

useEffect(()=>{


const unsubscribe = onAuthStateChanged(

auth,

(currentUser)=>{


setUser(currentUser);

setLoading(false);


}

);



return ()=>unsubscribe();



},[]);







// Email Login

async function login(email,password){


return await signInWithEmailAndPassword(

auth,

email,

password

);


}









// Register

async function register(email,password){


return await createUserWithEmailAndPassword(

auth,

email,

password

);


}









// Google Login

async function googleLogin(){


return await signInWithPopup(

auth,

googleProvider

);


}









// Logout

async function logout(){


return await signOut(auth);


}








return(


<AuthContext.Provider

value={{

user,

loading,

login,

register,

googleLogin,

logout

}}

>


{children}


</AuthContext.Provider>



)


}








export function useAuth(){


return useContext(AuthContext);


}