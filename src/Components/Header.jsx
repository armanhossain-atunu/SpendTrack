import React from 'react';
import useAuth from '../hooks/useAuth';

const Header = () => {
    const { user, logout } = useAuth();
    return (
        <div className='shadow-sm'>    
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
                            className="menu menu-sm dropdown-content  rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><a>{ user.displayName}</a></li>
                            <li><a>{ user.email}</a></li>
                            <li onClick={logout}><a >Logout</a></li>
                          
                        </ul>
                    </div>
                </div>
           
        </div>
    );
};

export default Header;