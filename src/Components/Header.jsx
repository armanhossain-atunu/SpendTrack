import React from 'react';
import useAuth from '../hooks/useAuth';
import Logo from './Logo';

const Header = () => {
    const { user, logout } = useAuth();
    return (
        <div className='bg-base-100 shadow-sm'>
            <div className="max-w-11/12 mx-auto flex items-center justify-between ">
            <div className='w-60 py-2'>
                <Logo></Logo>
            </div>
                <div className="flex gap-2">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-20 rounded-full">
                                <img
                                    alt="user"
                                    src={user.photoURL} />
                            </div>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><a>{ user.displayName}</a></li>
                            <li><a>{ user.email}</a></li>
                            <li onClick={logout}><a >Logout</a></li>
                          
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;