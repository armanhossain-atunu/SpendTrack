import React, { useEffect, useState } from 'react';
import { AuthCOntext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.init';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    const provider = new GoogleAuthProvider();

    const loginGoogle = () => {
        return signInWithPopup(auth, provider);
    }
    const userUpdate = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        });
    }
    const logout = () => {
        return signOut(auth);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    })
    const authInfo = {
        user,
        registerUser,
        loginUser,
        loginGoogle,
        userUpdate,
        logout

    };
    return (
        <AuthCOntext value={authInfo}>
            {children}
        </AuthCOntext>
    );
};

export default AuthProvider;