import React, { useState } from 'react'
import { LockClosedIcon } from '@heroicons/react/solid'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/Firebase';
import { goInfo, goLog } from '../user/UserSlice';
import { useDispatch } from 'react-redux';

const Inscription = () => {

    const [signup, setSignup] = useState({
        email: '',
        pwd: '',
        confirmPwd: ''
    })

    const [error, setError] = useState('')

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { email, pwd, confirmPwd } = signup;

    const handleEmail = e => {
        setSignup({ ...signup, email: e.target.value });
    }

    const handlePwd = e => {
        setSignup({...signup, pwd: e.target.value})
    }

    const handleConfirmPwd = e => {
        setSignup({ ...signup, confirmPwd: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, pwd)
            .then((userCredential) => {
                const user = userCredential.user;
                //navigate('/')
                dispatch(goLog(true));
                navigate('/');
            })
            .catch((error) =>
                console.log('ERROR', error.message)
                //setError(error.message)
            );
    }

    return (

        <></>
    )
}

export default Inscription