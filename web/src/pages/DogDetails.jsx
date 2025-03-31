// Import React to use JSX
// Import useState for hooks for state and useEffect for side effects
import React, { useState, useEffect } from 'react';
// Import useParams to get the dynamic 'id' from the URL
import { useParams } from 'react-router-dom';

const DogDetails = () => {

    // Get the dog ID from the URL params
    // Initialize state to hold dog data (null until data is loaded)
    const { id } = useParams();
    const [dog, setDog] = useState(null);

    // Fetch  > dog data from the server when the 'id' changes
    // res > convert response to JSON
    // data > store the fetched dog data in state
    useEffect(() => {

        fetch(`http://localhost:3000/dogs`)
            .then((res) => res.json())
            .then((data) => setDog(data));
    }, [id]);

    // This text messaje shows while the dog data is being fetched
    if (!dog) return <p>Loading...</p>;


    // This display the dog detail
    // the styles shows the dog information like breed, age, category and image of the dog 
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>{dog.name}</h1>
            {dog.image && (
                <img
                    src={`/images/${dog.image}`}
                    alt={dog.name}
                    style={{ width: '300px', height: 'auto', marginBottom: '20px' }}
                />
            )}
            
            <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'left' }}>
                <li><strong>Breed:</strong> {dog.breed}</li>
                <li><strong>Age (months):</strong> {dog.age}</li>
                <li><strong>Category:</strong> {dog.category}</li>
            </ul>
        </div>
    );
};

export default DogDetails;