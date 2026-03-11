import React from 'react';
import useAuth from '../hooks/useAuth';

const Home = () => {
    const { user,logout } = useAuth();
    console.log(user);
    return (
        <div>
            <h1>Home</h1>
            <p>{user.displayName}</p>
            <p>{user.email}</p>
           <img className='w-12 h-12 rounded-full' src={user.photoURL} alt="" />
           <button className='btn' onClick={logout}>Logout</button>
        </div>
    );
};

export default Home;