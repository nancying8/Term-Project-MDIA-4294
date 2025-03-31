// Import React to use JSX
// Import useState for hooks for state and useEffect for side effects
import React, { useState, useEffect } from 'react';
// Import useNavigate for navigation
import { useNavigate } from 'react-router-dom'; 
// Import global style
import g from '../global.module.css';
// Import dog image
import dogz from '../assets/images/dog-7.png';

const AddDogForm = () => {

    // State for holding the categories fetched from the backend
    const [categories, setCategories] = useState([]);
    // State to manage the form data (name, breed, age, category_id, image)
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        age: '',
        category_id: '',
        image: null,
    });

    // State for success/error message
    const [message, setMessage] = useState({ text: '', type: '' }); 
    // State to show options after success
    const [showOptions, setShowOptions] = useState(false); 
    // Hook for navigation
    const navigate = useNavigate();

    // Fetch categories
    useEffect(() => {
        fetch('http://localhost:3000/categories')
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.error('Error fetching categories:', err));
    }, []);

     // Handle input changes for text fields in the form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle file input change to update the image in the formData
    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    // Handle form submission to send the formData to the backend
    // POST > send the form data in the request body
    // Show options to add more or navigate home
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('breed', formData.breed);
        data.append('age', formData.age);
        data.append('category_id', formData.category_id);
        data.append('image', formData.image);

        fetch('http://localhost:3000/dogs', {
            method: 'POST',
            body: data,
        })
            .then((res) => {
                if (!res.ok) throw new Error('Failed to add dog');
                return res.json();
            })
            .then(() => {
                setMessage({ text: 'Dog added successfully!', type: 'success' }); 
                setShowOptions(true); 
            })
            .catch((err) => {
                console.error('Error adding dog:', err);
                setMessage({ text: 'Failed to add dog. Please try again.', type: 'error' }); 
            });
    };

    // Handle the option to add another dog after successful submission
    const handleAddMore = () => {
        setFormData({
            name: '',
            breed: '',
            age: '',
            category_id: '',
            image: null,
        });
        setMessage({ text: '', type: '' });
        setShowOptions(false);
    };

    // Using window.scrollto where positioning to top of the page
    // Navigate to the home screen
    const handleGoHome = () => {
        window.scrollTo(0, 0);
        navigate('/'); 
    };

    // Edit dog data is display in form 
    // Display success or error message based on the submission result 
    // Add another Dog > display options to add another dog or go home after successful submission
    // Go to home> naviate to hgome page
    return (
        <div className={g['container']}>
            <div className={g['flex']}>
                <div>
                    <h2>Add New Dog</h2>
                    {message.text && (
                        <h4
                            className={`${g['message']} ${
                                message.type === 'success' ? g['success'] : g['error']
                            }`}
                        >
                            {message.text}
                        </h4>
                    )}
                    {showOptions ? (
                        <div className={g['options']}>
                            <button
                                className={`${g['button']} ${g['small']} ${g['success']}`}
                                onClick={handleAddMore}
                            >
                                Add Another Dog
                            </button>
                            <button
                                className={`${g['button']} ${g['small']} ${g['primary']}`}
                                onClick={handleGoHome}
                            >
                                Go to Home
                            </button>
                        </div>
                    ) : (
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
                                    {categories.length > 0 ? (
                                        categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>No categories available</option>
                                    )}
                                </select>
                            </div>
                            <div className={g['form-group']}>
                                <label htmlFor="image">Image</label>
                                <input
                                    className={`${g["button"]} ${g["small"]} ${g["margin"]}`}
                                    type="file"
                                    id="image"
                                    name="image"
                                    onChange={handleFileChange}
                                    required
                                />
                            </div>
                            <button
                                className={`${g['buttonSelect']} ${g['small']}`}
                                type="submit"
                            >
                                Add Dog
                            </button>
                        </form>
                    )}
                </div>
                <div>
                    <h3 className={g['text']}>Hello</h3>
                    <img className={g['img']} src={dogz} alt="group-dog" />
                </div>
            </div>
        </div>
    );
};

export default AddDogForm;