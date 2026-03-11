import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
    return (
        <div className='bg-base-200 flex flex-col justify-center items-center min-h-screen gap-5'>
            <h1 className='text-3xl font-bold'> 4<span className='text-[#10B981]'>0</span>4 Page Not Found</h1>
            <Link to='/home' className='btn bg-[#10B981] text-white'>Back to Home</Link>
        </div>
    );
};

export default NotFound;