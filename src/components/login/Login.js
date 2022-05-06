import { LockClosedIcon } from '@heroicons/react/solid'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/Firebase';
import './Login.scss';

const Login = () => {

    const [signin, setSignin] = useState({
        email: '',
        pwd: ''
    })
    const { email, pwd } = signin

    const navigate = useNavigate();

    const handleEmail = e => {
        setSignin({ ...signin, email: e.target.value })
    }

    const handlePwd = e => {
        setSignin({ ...signin, pwd: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, pwd)
            .then((userCredential) => {
                navigate('/');
            })
            .catch((error) => {
                console.log('log error : ', error.message)
            });
    }

    const htmlBtn = (email !== '' && pwd !== '') ?
        <button type="submit" className="btn mb-btn mb-btn-full">
            Se connecter
        </button>
        :
        <button type="submit" className="btn mb-btn mb-btn-full btn-disabled" disabled>
            <div className="icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            </div>
            Se connecter
        </button>

    return (

        <div className="container mb-container mb-login">
            <div className="login-wrapper shadow-lg">
                <h2 className='text-center'>Connectez-vous</h2>
                <form onSubmit={handleSubmit}>
                    <div className="log-email">
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder='Email'
                            onChange={handleEmail}
                        />
                    </div>
                    <div className="mb-3 log-pwd">
                        <input type="password" className="form-control" id="pwd" placeholder='Mot de passe'
                            onChange={handlePwd}
                        />
                    </div>
                    {htmlBtn}
                </form>
            </div>
        </div>

    )
}

export default Login;