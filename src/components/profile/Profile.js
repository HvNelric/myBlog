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

    console.log('PROFILE info', info)

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
        <div className='container-fluid mb-profile'>
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

                                    />
                                </div>
                                <button type="submit" className="btn mb-btn">Changer image</button>
                            </form>
                            <form onSubmit={submitPseudo}>
                                <div className="pro-pwd">
                                    <input type="text" className="form-control" id="name" placeholder='Changer le pseudo'

                                    />
                                </div>
                                <button type="submit" className="btn mb-btn">Changer pseudo</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile