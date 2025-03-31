// Import React to use JSX
// Import useState for hooks
import React, { useState } from 'react';
// Import createPortal to render the modal into a different part of the DOM tree
import { createPortal } from "react-dom";
// Import component
import DeleteDogModalContent from "./DeleteDogModalContent";
// Import style
import g from "../global.module.css";

function DeleteDogModal({ dog, onDogDeleted }) {
    
    // Hanlde the visibility of Modal depende of response 
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
                className={`${g["button"]} ${g["small"]} ${g["delete"]}`}
                onClick={() => setShowModal(true)}
            >
                Delete
            </button>

            {showModal &&
                createPortal(
                    <DeleteDogModalContent
                        dog={dog}
                        onDogDeleted={onDogDeleted}
                        onClose={() => setShowModal(false)}
                    />,
                    document.body
                )}
        </>
    );
}

export default DeleteDogModal;