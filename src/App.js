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
import { goInfo, goLog, userInfo, userStatus } from './components/user/UserSlice';
import Landing from './components/landing/Landing';
import Profile from './components/profile/Profile';
import GodMode from './components/godmode/GodMode';



function App() {

    const dispatch = useDispatch();
    const isLogged = useSelector(userStatus);
    const actualInfo = useSelector(userInfo);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                console.log('APP user', user)
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
    }, [isLogged])

    //console.log('USER')

    return (
        <div id="app" className="container-fluid">
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/inscription' element={<Inscription />} />
                <Route path='/login' element={<Login />} />
                <Route path='/profile' element={<Profile />} />

                { (isLogged && actualInfo.email === 'azerty@gmail.com' ) &&
                    <Route path='/godmode' element={<GodMode />} />
                }

                <Route path="*" element={<h2 style={{marginTop: '5rem', textAlign: 'center', color: 'black'}}>Oups</h2>} />
            </Routes>
            <Nav />
        </div>
    );
}

export default App;
