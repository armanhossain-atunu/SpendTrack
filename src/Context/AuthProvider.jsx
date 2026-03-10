import React from 'react';
import { AuthCOntext } from './AuthContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.init';

const AuthProvider = ({ children }) => {
    const registerUser = ( email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = ( email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    const authInfo = {

        registerUser,
        loginUser
    };
    return (
        <AuthCOntext value={authInfo}>
            {children}
        </AuthCOntext>
    );
};

export default AuthProvider;