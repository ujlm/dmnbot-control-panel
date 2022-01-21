import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { db } from './../helpers/FireBaseConfig';
import { ref, onValue } from "firebase/database";

function ListModels() {
    const location = useLocation();
    console.log(location.search);
    const uid = parseInt(location.search.replace("?for=", ""));

    const [models, setModels] = useState([]);
    const modelRef = ref(db, 'users/' + uid + '/models/');
    useEffect(() => {
        // Get models once page renders
        const getModels = async () => {
            const res = await onValue(modelRef, (snapshot) => {
                let data = snapshot.val();
                let m = [];
                if(data !== null){
                    const keys = Object.keys(snapshot.val());
                    keys.forEach((key) => {
                        console.log(data[key].title);
                        data[key].id = key;
                        m.push(data[key]);
                    });
                }
            setModels(m);
            return res;
            });
        };
        return getModels();
    }, []);

    return JSON.stringify(models);
};

export default ListModels;