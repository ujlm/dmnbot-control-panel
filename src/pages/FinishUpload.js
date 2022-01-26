import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { getDatabase, ref, set, onValue, push, child, update } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function FinishUpload() {
    const location = useLocation();
    const navigate = useNavigate()

    const [uid, setUid] = useState(0);
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            setUid(user.uid);
            console.log('user is logged in');
            console.log(uid);
        } else {
            // User is signed out
            console.log('user is not logged in - go to sign in');
            navigate('/SignIn', {state:{email: "test@student.kuleuven.be"}});
        }
    });

    const saveFile = (event) => {
        event.preventDefault();
        console.log(event.target.title.value);
        const db = getDatabase();

        const fileData = 
            {
                title: event.target.title.value,
                description: event.target.description.value,
                file: {
                    name: location.state.file.name,
                    url: location.state.file.url
                }
            };
        const fileKey = push(child(ref(db), uid + '/models/')).key;

        const updates = {};
        updates['/users/' + uid + '/models/' + fileKey] = fileData;
        update(ref(db), updates)
        .then(() => {
            console.log('Successfully saved');
            navigate('/', {state:{success: "Model saved"}});
        })
        .catch((error) => {
            console.log(error);
        });
        
        /*
        // Create new item
        set(ref(db, 'users/' + 44), {
            username: "Pipo",
            email: "pipo@gmail.com"
        });
        */
        
    };

    return(
        <div className='container'>
            <section className='optionGroup'>
                <h2>Finish your upload here</h2>
                <form onSubmit={saveFile}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label for='filename'>Filename:</label>
                                </td>
                                <td>
                                    <input type="text" disabled="disabled" value={location.state.file.name} name="filename" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <label for='title'>Title:</label>
                                </td>
                                <td>
                                <input type="text" name="title" placeholder='Title' />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for='description'>Short description:</label>
                                </td>
                                <td>
                                    <input type='text' name='description' placeholder='I will help you...' />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br/>
                    <center><input type='submit' className='btn' value='Save model' /></center>
                </form>
            </section>
        </div>
    );
};

export default FinishUpload;