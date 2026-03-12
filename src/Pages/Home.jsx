import React from 'react';
import useAuth from '../hooks/useAuth';
import AddExpense from './AddExpense';

const Home = () => {
    const { user} = useAuth();
    console.log(user);
    return (
        <div>
           <AddExpense></AddExpense>
        </div>
    );
};

export default Home;