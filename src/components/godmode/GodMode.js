import React, { useEffect, useMemo, useState } from 'react';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { getDatabase, onValue, ref as dbRef, set } from 'firebase/database';
import './GodMode.scss'
import uuid from 'react-uuid';
import Modal from '../modal/Modal';

const GodMode = () => {



    const [preview, setPreview] = useState();

    const [data, setData] = useState({
        title: '',
        desc: ''
    });
    const [orderedPost, setOrderedPost] = useState([]);

    const { title, desc } = data;

    const [isModal, setIsmodal] = useState(false);
    const [modalInfo, setModalInfo] = useState({
        modalId: '',
        modalImg: '',
        modalTitle: '',
        modalDesc: ''
    })

    ///////////////////////////////

    //////////////////////////////

    const storage = getStorage();
    const db = getDatabase();

    const goGet = () => {

        const actusRef = dbRef(db, 'post');
        onValue(actusRef, (snapshot) => {
            const snap = snapshot.val();
            //console.log('SNAP : ', snap)

            const orderData = []
            Object.keys(snap)
                .sort()
                .reverse()
                .forEach(item => {
                    orderData.push({
                        'id': snap[item].id,
                        'title': snap[item].title,
                        'img': snap[item].img,
                        'desc': snap[item].desc,
                        'date': snap[item].date,
                        'fileName': snap[item].fileName,
                        'msg': snap[item].msg
                    })
                })
            setOrderedPost(orderData)
        });

    }

    useEffect(() => {
        goGet();
        
    }, [])

    const handleImage = e => {
        //console.log('file', e.target.files)
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setPreview(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const handleTitle = e => {
        setData({
            ...data,
            title: e.target.value
        })
    }

    const handleDesc = e => {
        setData({
            ...data,
            desc: e.target.value
        })
    }

    const submitPost = e => {
        e.preventDefault()

        const file = e.target[0].files[0];
        //console.log('file', file);
        const storageRef = ref(storage, `post/${file.name}`);

        const date = new Date();
        const formatDate = `${date.getDate() < 9 ? '0' + date.getDate() : date.getDate()}.${(date.getMonth() + 1) < 9 ? '0' + (date.getMonth() + 1) : date.getMonth()}.${date.getFullYear()}`

        const mbId = 'photo-' + uuid();

        uploadBytes(storageRef, file)
            .then((snapshot) => {
                //console.log('Uploaded a blob or file!', snapshot);
                ///////////////////
                getDownloadURL(ref(storage, `post/${file.name}`)).then((url) => {
                    //console.log('URL', url)
                    const imgUrl = url;
                    set(dbRef(db, 'post/' + mbId), {
                        id: mbId,
                        title: title,
                        date: formatDate,
                        desc: desc,
                        img: imgUrl,
                        fileName: file.name,
                        msg: ['premier commentaire', 'un autre commentaire trop bien']
                    }).then(() => {
                        goGet();
                        e.target.reset();
                    });
                })
                    .catch((error) => {
                        // Handle any errors
                    });
                //////////////////
            }).catch(error => {
                console.log('ERROR : ', error)
            });
    }

    const deleteElem = (id, fileName) => {

        const deleteRef = ref(storage, `post/${fileName}`);

        deleteObject(deleteRef).then(() => {
            console.log('DELETED')
        }).catch((error) => {
            console.log('delete error', error)
        });

        set(
            dbRef(
                db, 'post/' + id), null
        ).then(() => {
            goGet()
        });
    }

    const openModal = (modalId, modalImg, modalTitle, modalDesc) => {
        setModalInfo({
            ...modalInfo,
            modalId,
            modalImg,
            modalTitle,
            modalDesc
        });
        setIsmodal(!isModal)
    }

    const closeModal = () => {
        setIsmodal(false)
    }

    return (
        <div className='mb-godmode'>
            <div className='container'>
                <div className='title1'>GOD</div>
                <div className="title2">MODE</div>
            </div>

            <div className='container-fluid gm-form-wrapper'>
                <div className='container mb-container'>
                    <div className="row">
                        <div className="col-12 col-md-4 preview">
                            <div className="gm-card shadow">
                                <div className="img-wrapper">
                                    <img src={preview} alt="" />
                                </div>
                                <div className="bottom">
                                    <div className="title">
                                        {title}
                                    </div>
                                    <div className="desc">
                                        {/* {desc} */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-8 gm-form">
                            <form onSubmit={submitPost}>
                                <div className="mb-3 gm-item">
                                    <input type="file" className="form-control" id="gm-email" placeholder='Photo'
                                        onChange={handleImage}
                                    />
                                </div>
                                <div className="mb-3 gm-item">
                                    <input type="text" className="form-control" id="gm-title" placeholder='Titre'
                                        onChange={handleTitle}
                                    />
                                </div>
                                <div className="mb-3">
                                    <textarea className="form-control" id="desc" rows="8"
                                        onChange={handleDesc}
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
            </div>

            <div className="container mb-container gm-admin">
                <div className="row">
                    {
                        orderedPost.map(item => (
                            <div className="col-12 col-md-4 col-lg-3 elem-item" key={item.id}>
                                <div className="gm-card shadow-sm">
                                    <div className="img-wrapper">
                                        <img src={item.img} alt="" />
                                        <div className="gm-icon-del-wrapper" onClick={() => deleteElem(item.id, item.fileName)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                        <div className="gm-icon-edit-wrapper" onClick={()=> openModal(item.id, item.img, item.title, item.desc)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="bottom">
                                        <div className="title">
                                            {item.title}
                                            <div className="icon-wrapper icon-plus-wrapper">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="desc">
                                            {item.desc}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            {
                isModal && <Modal fnclose={closeModal} id={modalInfo.modalId} img={modalInfo.modalImg} title={modalInfo.modalTitle} desc={modalInfo.modalDesc} />
            }
        </div>
    )
}

export default GodMode