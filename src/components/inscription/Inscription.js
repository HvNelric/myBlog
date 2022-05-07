import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/Firebase';
import { goLog } from '../user/UserSlice';
import { useDispatch } from 'react-redux';
import './Inscription.scss'

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

    const htmlBtn = (email !== '' && pwd !== '' && confirmPwd !== '' && pwd === confirmPwd)
        ?
        <button type="submit" className="btn mb-btn mb-btn-full">
            S'inscrire
        </button>
        :
        <button type="submit" className="btn mb-btn mb-btn-full btn-disabled" disabled>
            <div className="icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            </div>
            S'inscrire
        </button>

    return (

        <div className="container mb-container mb-login">
            <div className="login-wrapper shadow-lg">
                <div className="svg-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.009 13.388c-1.771 2.408-4.399 4.783-7.359 4.396-.801 1.119-1.695 2.682-2.688 4.496l-2.296.72c1.943-3.79 4.537-7.981 7.32-11.166-1.205.785-3.185 2.473-4.908 4.253-1.554-3.246.085-6.253 2.458-8.548-.067 1.081.413 2.068.772 2.575-.062-.904.044-2.52.704-3.92 1.323-1.116 2.492-1.92 3.829-2.622-.217.791-.033 1.739.222 2.331.116-.82.603-2.368 1.167-3.01 1.667-1.075 4.135-1.936 6.77-1.892-.291 1.623-1.143 4.258-2.294 5.893-.929.597-2.157.946-3.137 1.115.811.228 1.719.293 2.509.235-.575 1.207-1.157 2.311-2.039 3.666-1.216.679-2.77.978-3.832 1.035.743.389 2.097.617 2.802.443zm-14.009 8.612h-4v1h4v-1z" /></svg>
                </div>
                <h2 className='text-center'>Inscription</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2 email">
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder='Email'
                            onChange={handleEmail}
                        />
                    </div>
                    <div className="mb-2 pwd">
                        <input type="password" className="form-control" id="pwd" placeholder='Mot de passe'
                            onChange={handlePwd}
                        />
                    </div>
                    <div className="mb-4 confirm-pwd">
                        <input type="password" className="form-control" id="confirmpwd" placeholder='Confirmation mot de passe'
                            onChange={handleConfirmPwd}
                        />
                    </div>
                    {htmlBtn}
                </form>
            </div>
        </div>
    )
}

export default Inscription