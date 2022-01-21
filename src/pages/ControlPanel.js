import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faWindowClose } from '@fortawesome/free-regular-svg-icons';
import Header from '../components/Header';
import {db, storage} from './../helpers/FireBaseConfig';
import { deleteObject } from 'firebase/storage';
import {ref as storageRef } from 'firebase/storage';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { ref, set, onValue, push, child, update, removeValue, getDocs, get } from "firebase/database";

function ControlPanel() {
    const location = useLocation();
    const navigate = useNavigate();

    const [uid, setUid] = useState(0);

    const checkAuth = () => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                setUid(user.uid);
                console.log(uid);
            } else {
                // User is signed out
                console.log('user is not logged in - go to sign in');
                navigate('/SignIn', {state:{email: "test@student.kuleuven.be"}});
            }
        });
    };

    const [models, setModels] = useState([{title: "No models uploaded", description: "You can upload a model in the 'Upload DMN model' section", file: {name:'', url:''}, id:'none'}]);
    const modelRef = ref(db, 'users/' + uid + '/models/');
    useEffect(() => {
        // Check if user is logged in
        checkAuth();

        // Get models once page renders
        const fetchData = async () => {
            const data = await onValue(modelRef,(snapshot) => {
            let data = snapshot.val();
            let m = [];
            if(data !== null){
                const keys = Object.keys(snapshot.val());
                keys.forEach((key) => {
                    data[key].id = key;
                    m.push(data[key]);
                });
                setModels(m);
            }
        });
    }
    if(fetchData()){
       console.log('models set');
    }
    }, []);

    const getFileData = (filedata) => {
        console.log("File uploaded: " + filedata.url);
        toFinishUpload({
            name: filedata.name,
            url: filedata.url
        });
    };

    const closeMsgBox = () => {
        document.getElementById('successmsg').className += ' nodisp';
    };

    const displaySuccess = () => {
        if(location.state !== null && location.state !== undefined){
            if(location.state.success){
                return(
                    <section id="successmsg" className='optionGroup collapsed'>
                        <h2>Model saved!</h2>
                        <button onClick={closeMsgBox}><FontAwesomeIcon icon={faWindowClose} alt="Close notification" /></button>
                    </section>
                );
            }
        }
        return <span></span>;
    };

    const toFinishUpload = (filedata) => {
        navigate('/FinishUpload', {state: {file: filedata}});
    }

    const deleteModel = (id, url) => {
        console.log('Delete model ' + id);
        let fileName = url.replace("%2F", "/").split('models');
        fileName = 'models' + fileName[fileName.length - 1].split("?")[0];
        console.log(fileName);

        // 1. Delete the file from cloud storage
        const fileRef = storageRef(storage, fileName);
        deleteObject(fileRef).then(() => {
            console.log('file deleted');
        }).catch((error) => {
            console.log(error);
        });

        // 2. Delete entry from database
        set(child(modelRef, id), null);
    };

    return(
        <>
        <Header />
        <div className='container'>
            <section className='sx-center'>
            <h1>Welcome to your DMN bot control panel</h1>
            </section>
            {displaySuccess()}
            <FileUpload setFileData={getFileData} />
            <section className='optionGroup'>
                <h3>List of files</h3>
                <table className="tg">
                    <thead>
                    <tr>
                        <th className="tg-0lax">Title</th>
                        <th className="tg-0lax">Description</th>
                        <th className="tg-0lax">Filename</th>
                        <th className="tg-0lax">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {models.map(
                            (model, index)=>{
                                let className = "tg-0lax";
                                if(index%2 === 0){
                                    className = "tg-0lax bg-grey";
                                }
                                return( 
                                    <tr key={model.file.url}>
                                        <td className={className}>{model.title}</td>
                                        <td className={className}>{model.description}</td>
                                        <td className={className}>{model.file.name}</td>
                                        <td className={className}>
                                            <a href={model.file.url} target="_blank"><FontAwesomeIcon icon={faDownload} alt="Download model" /></a>&nbsp;&nbsp;
                                            <button onClick={()=>{deleteModel(model.id, model.file.url)}} alt="Delete model"><FontAwesomeIcon icon={faTrashAlt} /></button>
                                        </td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
            </section>
        </div>
        </>
    );
}

export default ControlPanel;