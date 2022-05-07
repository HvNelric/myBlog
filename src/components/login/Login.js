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
                <div className="svg-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 12.242v7.894l-4.291.864-.709-3.827 4.005-5.909c.331.382.352.46.995.978zm2 1.176v8.015l2.732 2.567 3.268-2.567-1.052-1.109 1.052-1.108-1.052-1.108 1.052-1.108v-3.583c-.941.381-1.955.583-3.001.583-1.045 0-2.059-.202-2.999-.582zm7.242-11.661c-2.131-2.131-5.424-2.25-7.687-.651-1.174.821-1.96 1.94-2.335 3.378-1.664-.087-2.72-.905-2.72-1.484 0-.6 1.128-1.46 2.898-1.494.42-.524.67-.822 1.42-1.36-.42-.086-.856-.146-1.318-.146-2.485 0-4.5 1.343-4.5 3 0 1.936 2.526 3 4.5 3 2.818 0 5.337-1.892 4.252-3.967.567-.912 1.682-.902 2.309-.275.975.975.24 2.625-1.146 2.544-.862 2.006-3.376 3-5.794 2.879.225 1.122.768 2.192 1.638 3.062 2.342 2.344 6.141 2.343 8.484 0 1.17-1.172 1.757-2.708 1.757-4.244 0-1.535-.586-3.07-1.758-4.242z" /></svg>
                </div>
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