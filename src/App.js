import React, { useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.scss';
import Nav from './components/nav/Nav';
import Login from './components/login/Login';
import { Route, Routes } from 'react-router-dom';
import Inscription from './components/inscription/Inscription';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './components/firebase/Firebase';
import { useDispatch, useSelector } from 'react-redux';
import { goInfo, goLog, userInfo } from './components/user/UserSlice';
import Landing from './components/landing/Landing';
import Profile from './components/profile/Profile';



function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                console.log('user', user)
                dispatch(goLog(true))
                dispatch(goInfo({
                    uid: user.uid,
                    img: user.photoURL,
                    name: user.displayName,
                    email: user.email
                }))
            } else {
                dispatch(goLog(false))
            }
        });
    }, [])


    return (
        <div id="app" className="container-fluid">
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/inscription' element={<Inscription />} />
                <Route path='/login' element={<Login />} />
                <Route path='/profile' element={<Profile />} />
            </Routes>
            <Nav />
        </div>
    );
}

export default App;
