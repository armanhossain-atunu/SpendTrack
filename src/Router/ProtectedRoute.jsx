import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) return <div className='flex justify-center items-center min-h-screen'>Loading....</div>
    if (user) return children
    return <Navigate to='/' state={location.pathname} replace='true' />
};

export default ProtectedRoute;