import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/"></Navigate>
    }

    return children
};

export default ProtectedRoute;