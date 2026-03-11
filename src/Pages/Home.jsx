import React from 'react';
import useAuth from '../hooks/useAuth';
import Header from '../Components/Header';

const Home = () => {
    const { user} = useAuth();
    console.log(user);
    return (
        <div>
           <Header></Header>
        </div>
    );
};

export default Home;