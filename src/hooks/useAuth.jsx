import React, { use } from 'react';
import { AuthCOntext } from '../Context/AuthContext';

const useAuth = () => {
    const authInfo=use(AuthCOntext)
    return authInfo;
};

export default useAuth;