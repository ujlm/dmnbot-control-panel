import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import app from './../helpers/firebase';
import { getDatabase, ref, set, onValue, push, child, update, removeValue } from "firebase/database";

function ControlPanel() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const db = getDatabase();   

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
                        <button onClick={closeMsgBox}>Close</button>
                    </section>
                );
            }
        }
        return <span></span>;
    };

    const toFinishUpload = (filedata) => {
        navigate('/FinishUpload', {state: {file: filedata}});
    }
    
    const buildTable = () => {
        /*
        const models = [
            {
                "title": "BMI RiskLevel",
                "description": "Determine your risk level based on your BMI (I'll help you define your BMI)",
                "file": {
                    "name": "BMILevel.dmn",
                    "url": "https://wearabout.eco/assets/BMILevel.dmn"
                }
            },
            {
                "title": "Car Insurance",
                "description": "I will tell you if you're eligible for compensation after an accident",
                "file": {
                    "name": "InsuranceFixed.dmn",
                    "url": "#"
                }
            },
            {
                "title": "COPD Severeness",
                "description": "I will help you determine if you have Chronic Obstructive Pulmonary Disease",
                "file": {
                    "name": "COPD_Severeness.dmn",
                    "url": "##"
                }
            }
        ];
        */
       let models = [];
        
        const modelRef = ref(db, 'users/44/models/');
        onValue(modelRef, (snapshot) => {
            const data = snapshot.val();
            const keys = Object.keys(snapshot.val());
            keys.forEach((key) => {
                console.log(data[key].title);
                data[key].id = key;
                models.push(data[key]);
            });
        });

        return models.map(
            (model, index)=>{
                console.log(index);
                let className = "tg-0lax";
                if(index%2 === 0){
                    className = "tg-0lax bg-grey";
                }
                console.log(model.title);
                return(
                    <tr key={model.file.url}>
                        <td className={className}>{model.title}</td>
                        <td className={className}>{model.description}</td>
                        <td className={className}>{model.file.name}</td>
                        <td className={className}>
                            <a href={model.file.url} target="_blank">Download</a>
                            <button onClick={()=>{deleteModel(model.id)}}>Delete</button>
                        </td>
                    </tr>
                )
            }
        )
    };

    const deleteModel = (id) => {
        console.log('Delete model ' + id);
        const modelRef = ref(db, 'users/44/models/');
        set(child(modelRef, id),null);
    };

    return(
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
                        {buildTable()}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default ControlPanel;