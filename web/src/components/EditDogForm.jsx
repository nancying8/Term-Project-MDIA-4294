// Import React to use JSX
// Import useState for hooks for state and useEffect for side effects
import React, { useState, useEffect } from 'react';
// Import useParams to get the dynamic 'id' from the URL
import { useParams } from 'react-router-dom';
// Import components
import EditDogFormModal from './EditDogFormModal';
// Import style
import g from '../global.module.css';

const EditDogForm = () => {
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        age: '',
        category_id: '',
        image: null, 
        currentImage: '', 
    });

    // Upload new image
    const [isNewImage, setIsNewImage] = useState(false); 
    // Display the messaje after click the button
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        let isMounted = true;

        // Fetch dog details using localhost:3000/dogs 
        // If the response is not successful, throw an error
        // If the response is sucess show the current image 
        // image:null is to reset the image 
        fetch(`http://localhost:3000/dogs/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch dog details');
                return res.json();
            })
            .then((data) => {
                if (isMounted) {
                    setFormData({
                        ...data,
                        image: null,
                        currentImage: data.image,
                    });
                }
            })
            .catch((err) => isMounted && setError(err.message));

        // Fetch categories using localhost:3000/categories
        // If the response is not successful, throw an error
        // If the response is sucess show the categories   
        fetch('http://localhost:3000/categories')
            .then((res) => res.json())
            .then((data) => isMounted && setCategories(data))
            .catch((err) => isMounted && setError(err.message))
            .finally(() => isMounted && setLoading(false));

        return () => {
            isMounted = false;
        };
    }, [id]);

    // Handle the change/update of new dog data
    // Destructure name, value, and files from the event target
    // Update formData with the selected image file and set `isNewImage` to true
    // For other form fields, update the corresponding field in formData
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({ ...formData, image: files[0] });
            setIsNewImage(true);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Hanlde the new dog data 
    // Check if all required fields are filled out
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.breed || !formData.age || !formData.category_id) {
            alert('Please fill out all fields');
            return;
        }
        // Create a new FormData object to send the data as multipart/form-data
        // If there's a new image, append it to the FormData object
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('breed', formData.breed);
        formDataToSend.append('age', formData.age);
        formDataToSend.append('category_id', formData.category_id);
        if (isNewImage && formData.image) {
            formDataToSend.append('image', formData.image);
        }

        // Send the form data to the server using a PUT request to update the dog details
        // If the response is not successful, throw an error
        // If successful, open the modal (set `isModalOpen` to true)
        fetch(`http://localhost:3000/dogs/${id}`, {
            method: 'PUT',
            body: formDataToSend,
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to update dog');
                }
                return res.json();
            })
            .then(() => {
                setIsModalOpen(true);
            })
            .catch((err) => alert(`Error: ${err.message}`));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


    return (
        <div className={g['container']}>
            <h3>Edit Dog Info:</h3>
            <form onSubmit={handleSubmit}>
                <div className={g['form-group']}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={g['form-group']}>
                    <label htmlFor="breed">Breed</label>
                    <input
                        type="text"
                        id="breed"
                        name="breed"
                        value={formData.breed}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={g['form-group']}>
                    <label htmlFor="age">Age (months)</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={g['form-group']}>
                    <label htmlFor="category_id">Category</label>
                    <select
                        id="category_id"
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                        required
                    >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                </div>

                {/* Display the current image */}
                {formData.currentImage && (
                    <div>
                        <h5>Current Image:</h5>
                        <img
                            src={`http://localhost:3000/images/${formData.currentImage}`}
                            alt="Current Dog"
                            style={{ width: '200px', height: 'auto', marginBottom: '10px' }}
                        />
                    </div>
                )}

                {/* File input for new image */}
                <input
                    className={`${g["button"]} ${g["small"]} ${g["margin"]}`}
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                />
                <button className={`${g["button"]} ${g["small"]} ${g["margin"]}`} type="submit">Update Dog</button>
                
                {isModalOpen && (
                // Pass the form data to the modal
                 // Close modal handler
                 // Callback on success
                <EditDogFormModal
                    dog={formData} 
                    onClose={() => setIsModalOpen(false)}
                    onDogUpdated={(dogId) => console.log('Dog updated with ID:', dogId)}
                    formData={formData}
                    isNewImage={isNewImage}
                />
            )}
            </form>
        </div>
    );
};

export default EditDogForm;
