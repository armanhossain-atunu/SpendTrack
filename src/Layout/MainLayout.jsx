import React from 'react';
import { Outlet } from 'react-router';
import Header from '../Components/Header';

const MainLayout = () => {
    return (
        <div>
            <div>
                <Header></Header>
            </div>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default MainLayout;