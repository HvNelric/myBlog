import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { useSelector } from 'react-redux';
import { userInfo, userStatus } from '../user/UserSlice';
import anon from '../../img/anon.jpeg'
import { NavLink, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import './Nav.scss';

const Nav = () => {

    const user = useSelector(userStatus);
    const info = useSelector(userInfo)
    const auth = getAuth();
    const refDrop = useRef();

    const navigate = useNavigate();

    console.log('INFO: ', info)
    console.log('LOG: ', user)

    const [drop, setDrop] = useState()

    const toggleDrop = event => {
        setDrop(!drop)
    }

    const logOut = () => {

        signOut(auth).then(() => {
            navigate('/')
        }).catch((error) => {
            // An error happened.
        });
    }

    useEffect(() => {
        const handleClickOutside = event => {

            if (refDrop.current && !refDrop.current.contains(event.target) && !event.target.classList.contains('nav-link') && !event.target.classList.contains('icon-svg')) {
                setDrop(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [refDrop])


    const htmlDrop = drop &&
        (user ?
            <div className="nav-user-content">
                <ul className='content-ul'>
                    <li className='content-li'>
                        <NavLink to='/profile' className="nav-link">
                            <div className='icon-wrapper'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            Profile
                        </NavLink>
                    </li>
                    <li className='content-li'>
                        <a className="nav-link" onClick={logOut}>
                            <div className='icon-wrapper'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                            </div>
                            Se déconnecter
                        </a>
                    </li>
                </ul>
            </div>
            :
            <div className="nav-user-content">
                <ul className='content-ul'>
                    <li className='content-li'>
                        <NavLink to='/inscription' className="nav-link">
                            <div className='icon-wrapper'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            S'inscrire
                        </NavLink>
                    </li>
                    <li className='content-li'>
                        <NavLink to='/login' className="nav-link">
                            <div className='icon-wrapper'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                            </div>
                            Se connecter
                        </NavLink>
                    </li>
                </ul>
            </div>
        )

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top shadow">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Navbar</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-md-flex justify-content-md-between align-items-md-center" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-md-flex align-items-md-center">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                    </ul>
                    <div className="nav-right">
                        { user &&
                            <div className="user-info">
                                <strong>{info.name} | </strong> {info.email}
                            </div>
                        }
                        <div ref={refDrop} className={`nav-user-wrapper ${drop ? 'active' : ''}`} onClick={toggleDrop}>
                            <img src={user ? info.img : ''} alt="" />
                        </div>
                        {htmlDrop}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav