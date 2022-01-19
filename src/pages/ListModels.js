import React from 'react';
import { useLocation } from 'react-router-dom';

function ListModels() {
    const location = useLocation();
    console.log(location.search);
    const uid = parseInt(location.search.replace("?for=", ""));
    console.log(uid);

    const models = [
        {
            "title": "BMI RiskLevel",
            "description": "Determine your risk level based on your BMI (I'll help you define your BMI)",
            "file":"https://wearabout.eco/assets/BMILevel.dmn"
        },
        {
            "title": "Car Insurance",
            "description": "I will tell you if you're eligible for compensation after an accident",
            "file": "models/InsuranceFixed.dmn"
        },
        {
            "title": "COPD Severeness",
            "description": "I will help you determine if you have Chronic Obstructive Pulmonary Disease",
            "file": "models/COPD_Severeness.dmn"
        }
    ]

    return(
        <>
        <h1>I list models for {uid}</h1>
        <p>
            {JSON.stringify(models)}
        </p>
        </>
    );
};

export default ListModels;