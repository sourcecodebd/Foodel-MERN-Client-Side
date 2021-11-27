import { Button } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import { pressOnBar } from '../Nav';
import './NavBar.css';

const NavBar = () => {
    const activeStyles = {
        backgroundColor: 'limegreen',
        color: 'white',
        lineHeight: '60px',
        width: 'fit-content',
        padding: '0 10px'
    }
    const { firebase } = useAuth();
    const { user, logOut, admin } = firebase;

    return (
        <div id="header">
            <div className="navbar-main">
                <a href="/"><img src="./foodel-logo.png" width="60px" className="img-fluid" alt="" /></a>
                <nav>
                    <div className="nav">
                        <li><NavLink to='/search' activeStyle={activeStyles}><i className="fas fa-search"></i></NavLink></li>
                        <li><NavLink to='/home' activeStyle={activeStyles}>Home</NavLink></li>
                        <li><NavLink to='/foods' activeStyle={activeStyles}>Food-Menu</NavLink></li>
                        <li><NavLink to='/my-orders' activeStyle={activeStyles}>My Orders</NavLink></li>
                        {
                            admin &&
                            <div className="d-flex justify-content-center align-items-center">
                                <li><NavLink to='/admin' activeStyle={activeStyles}>Admin</NavLink></li>
                            </div>
                        }

                        {
                            (user?.email || user?.displayName) ?
                                <div className="d-flex">
                                    <li>
                                        {user?.displayName}
                                        {
                                            user.photoURL ?
                                                <img src={user?.photoURL} width="12px" className=" rounded-pill border-6 ms-4" alt={user?.displayName} />
                                                :
                                                <i className="fas fa-user ms-2"></i>
                                        }
                                    </li>
                                    <li>
                                        <Button onClick={logOut} variant="contained" className="bg-danger"><i className="fas fa-sign-out-alt me-2"></i> Logout</Button>
                                    </li>
                                </div>

                                :
                                <li>
                                    <NavLink to='/login'>
                                        <Button variant="contained" className="bg-limegreen"><i className="fas fa-sign-in-alt me-2"></i> Login</Button>
                                    </NavLink>
                                </li>
                        }
                    </div>
                    <i onClick={pressOnBar} className="fas fa-bars fa-2x" id="menubar"></i>
                </nav>
            </div >
            <div className="mobile-nav mt-3">
                <li><NavLink to='/search' activeStyle={activeStyles}><i className="fas fa-search pt-5"></i></NavLink></li>
                <li><NavLink to='/home' activeStyle={activeStyles}>Home</NavLink></li>
                <li><NavLink to='/foods' activeStyle={activeStyles}>Food-Menu</NavLink></li>
                <li><NavLink to='/my-orders' activeStyle={activeStyles}>My Orders</NavLink></li>
                {
                    admin &&
                    <div>
                        <li><NavLink to='/admin' activeStyle={activeStyles}>Admin</NavLink></li>
                    </div>
                }
                {
                    (user?.email || user?.displayName) ?
                        <div>
                            <li>
                                {user?.displayName}
                                {
                                    user.photoURL ?
                                        <img src={user?.photoURL} width="35px" className="rounded-pill border border-warning border-2 ms-4" alt="" />
                                        :
                                        <i className="fas fa-user ms-2"></i>
                                }
                            </li>
                            <li>
                                <Button onClick={logOut} variant="contained" className="bg-danger"><i className="fas fa-sign-out-alt me-2"></i> Logout</Button>
                            </li>
                        </div>

                        :
                        <li>
                            <NavLink to='/login'>
                                <Button variant="contained" className="bg-limegreen"><i className="fas fa-sign-in-alt me-2"></i> Login</Button>
                            </NavLink>
                        </li>
                }
            </div>
        </div >
    );
};

export default NavBar;