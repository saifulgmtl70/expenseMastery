import {  createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../Firebase/firebase.config";
// import useAxiosPublic from "../Hooks/useAxiosPublic";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const Authprovider = ({children}) => {
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState();

    // const axiosPublic = useAxiosPublic();

    // Create User
    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Sign up with google
    const googleSin = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // Login
    const login = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Logout
    const logOut = () =>{
        return signOut(auth)
    }

    const updateUserProfile = (name) =>{
        updateProfile(auth.currentUser, {
            displayName: name, 
        });
    }


    // user available or not

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log("Current User", currentUser);
            setUser(currentUser);
            
            setLoading(false);
        });
        return () => {
            return unsubscribe();
        }
    }, [])

    const authinfo = {
        user,
        createUser,
        googleSin,
        login,
        logOut,
        loading,
        updateUserProfile

    }

    return (
        <AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authprovider;