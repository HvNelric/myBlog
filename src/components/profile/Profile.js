import React, { useState } from 'react';
import './Profile.scss'
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { auth } from '../firebase/Firebase';
import { updateProfile } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { goInfo, userInfo } from '../user/UserSlice';
import { PhoneIncomingIcon } from '@heroicons/react/outline';

const Profile = () => {

    const storage = getStorage();

    const info = useSelector(userInfo)
    const dispatch = useDispatch()

    const submitImg = e => {
        e.preventDefault()

        const file = e.target[0].files[0];

        const storageRef = ref(storage, `profile/${file.name}`);

        if (auth.currentUser.photoURL && auth.currentUser.photoURL !== '') {
            const deleteRef = ref(storage, `profile/${auth.currentUser.photoURL.split('%2F')[1].split('?alt=')[0]}`);
            deleteObject(deleteRef).then(() => {
                console.log('DELETED')
            }).catch((error) => {
                console.log('delete error', error)
            });
        }
        
        uploadBytes(storageRef, file)
            .then((snapshot) => {
                //console.log('Uploaded a blob or file!', snapshot);
                ///////////////////
                getDownloadURL(ref(storage, `profile/${file.name}`)).then((url) => {

                    updateProfile(auth.currentUser, {
                        photoURL: url
                    }).then(() => {
                        dispatch(goInfo({
                            ...info,
                            img: url
                        }))
                        console.log('UPDATED')
                        e.target.reset()
                    }).catch((error) => {
                        console.log('PROFILE ERROR', error)
                    });

                }).catch((error) => {
                    // Handle any errors
                });
                //////////////////
            }).catch(error => {
                console.log('ERROR : ', error)
            });
    }

    const submitPseudo = e => {
        e.preventDefault()

        updateProfile(auth.currentUser, {
            displayName: e.target[0].value
        }).then(() => {
            dispatch(goInfo({
                ...info,
                name: e.target[0].value
            }))
            console.log('etarget', e.target[0].value)
            e.target.reset();
        }).catch((error) => {
            console.log('PROFILE ERROR', error)
        });
    }

    return (
        <div className='container-fluid p-0 mb-profile'>
            <div className='container-fuid p-0 profile-wrapper'>
                <div className="container mb-container">
                    <div className="row">
                        <div className="col-12 col-md-4 pro-left">
                           <div className='left-wrapper'>
                                <div className="img-wrapper pro-img-wrapper shadow">
                                    <img src={info.img} alt={info.name} />
                                </div>
                                <div className="profile-name">
                                    {info.name}
                                </div>
                           </div>
                        </div>
                        <div className="col-12 col-md-8 pro-right">
                            <div className='form-wrapper'>
                                <form onSubmit={submitImg}>
                                    <div className="mb-4 pro-file">
                                        <input type="file" className="form-control" id="email" aria-describedby="emailHelp" placeholder='Changer photo de profil'
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn shadow-sm mb-btn">
                                        <div className='icon-wrapper'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </button>
                                </form>
                                <form onSubmit={submitPseudo}>
                                    <div className="pro-pwd">
                                        <input type="text" className="form-control" id="name" placeholder='Changer le pseudo'
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn shadow-m mb-btn">
                                        <div className='icon-wrapper'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile