// Import React to use JSX
// Import useEffect for side effects
import React, { useEffect } from 'react';
// import style
import g from "../global.module.css";
import m from "./DeleteDogModalContent.module.css";

function DeleteDogModalContent({ dog, onClose, onDogDeleted }) {

    // Using window.scrollto where positioning to top of the page
    // Navigate to the home screen
     useEffect(() => {
            window.scrollTo(0, 0);
        }, []);

    // Delete the form data to the server using a DELETE request to update the dog details
    // If the response is not successful, throw an error
    // If successful, open the modal and onClose the modal
    const handleDeleteDog = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/dogs/${dog.id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete dog");
            }

            onDogDeleted(dog.id);
            onClose();
        } catch (err) {
            console.error("Error deleting dog:", err);
            alert("Failed to delete dog. Please try again.");
        }
    };

    return (
        <div className={m["modal-container"]}>
            <div className={`${m["modal"]} ${g["card"]}`}>
                <h3>Are you sure you want to delete {dog.name}?</h3>
                <form onSubmit={handleDeleteDog}>
                    <button className={`${g["button"]} ${g["delete"]}`} type="submit">
                        Yes, delete this dog.
                    </button>
                </form>
                <button className={m["modal__close-button"]} onClick={onClose}>
                    x
                </button>
            </div>
        </div>
    );
}

export default DeleteDogModalContent;
