import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { getDatabase, ref, set, onValue, push, child, update } from "firebase/database";

function FinishUpload() {
    const location = useLocation();
    const navigate = useNavigate();

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
        const fileKey = push(child(ref(db), 'models/')).key;

        const updates = {};
        updates['/users/' + 44 + '/models/' + fileKey] = fileData;
        update(ref(db), updates)
        .then(() => {
            console.log('Successfully saved');
            navigate('/', {state:{success:true}});
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