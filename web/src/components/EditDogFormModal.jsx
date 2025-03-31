// Import React to use JSX
// Import useEffect for side effects
import React, { useEffect } from 'react';
// Import useNavigate to apply navigation to ..
import { useNavigate } from 'react-router-dom';
// import syles
import g from "../global.module.css";
import m from "./DeleteDogModalContent.module.css";

// Using window.scrollto where positioning to top of the page
// Navigate to the home screen

// Set a timeout to navigate after 3 seconds
// Navigate to the home page
// 1seconds delay

// Cleanup the timer if the component unmounts

function EditDogFormModal({ dog }) {
    const navigate = useNavigate();

    useEffect(() => {
        
        window.scrollTo(0, 0);

        const timer = setTimeout(() => {
            navigate('/'); 
        }, 1000); 

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className={m["modal-container"]}>
            <div className={`${m["modal"]} ${g["card"]}`}>
                <h3>Dog updated successfully! {dog?.name}</h3>
            </div>
        </div>
    );
}

export default EditDogFormModal;
