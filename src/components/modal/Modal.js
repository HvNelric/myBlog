import { child, get, getDatabase, push, ref as dbRef, update } from 'firebase/database';
import React, { useRef, useState } from 'react';
import './Modal.scss'

const Modal = ({ id, img, title, desc, fnclose }) => {
    
    //console.log('modal : ', id)

    const [modalState, setModalState] = useState({
        mtitle: title,
        mdesc: desc
    })

    const { mtitle, mdesc } = modalState;

    const submitUpdate = e => {
        e.preventDefault();
        const db = getDatabase();
        const dataRef = dbRef(getDatabase());

        get(child(dataRef, `post/${id}`)).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log('snap : ', snapshot.val());
                const snap = snapshot.val();
                update(child(dbRef(db), `post/${id}`), {
                    ...snap,
                    title: mtitle,
                    desc: mdesc
                })
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const handleUpdateTitle = e => {
        setModalState({
            ...modalState,
            mtitle: e.target.value
        })
    }

    const handleUpdateDesc = e => {
        setModalState({
            ...modalState,
            mdesc: e.target.value
        })
    }

    return (
        <div className='container-fluid p-0 modal-container'>
            <div className="modal-wrapper">
                <button className='btn mb-btn modal-close-btn' onClick={fnclose}>
                    <div className="icon-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </button>
                <div className="img-wrapper modal-img-wrapper">
                    <img src={img} alt="" />
                </div>
                <div className="modal-form">
                    <form onSubmit={submitUpdate}>
                        <div className="mb-4 gm-item">
                            <input type="text" className="form-control" id="gm-title" placeholder='Titre'
                                value={mtitle}
                                onChange={handleUpdateTitle}
                            />
                        </div>
                        <div className="mb-4">
                            <textarea className="form-control" id="desc" rows="10"
                                value={mdesc}
                                onChange={handleUpdateDesc}
                            ></textarea>
                        </div>
                        <button className='btn mb-btn'>
                            <div className="icon-wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z" /></svg>
                            </div>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal