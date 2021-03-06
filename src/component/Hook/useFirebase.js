
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../../Firebase/Firebse.init";

 initializeAuthentication();
const useFirebase = () => {
    const [user, setUser] = useState({}); 

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

   
    const signInUsingGoogle = () => {
        return  signInWithPopup(auth, googleProvider);
        
    }

    const logOut = () => {
        signOut(auth)
        .then( () => {
            setUser({})
        })
    }
    useEffect( () => {
         /* special observer */
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } 
          });
    },[])
    return {
        user,
        signInUsingGoogle,
        logOut
    }
}

export default useFirebase;