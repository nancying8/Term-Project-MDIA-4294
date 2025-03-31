// Import React to use JSX
// Import useState for hooks for state and useEffect for side effects
import React, { useState, useEffect } from "react";
// Import Link for navigation
import { Link } from "react-router-dom";
// Import components DeleteDogModal for deleting a dog
import DeleteDogModal from "../components/DeleteDogModal";
// Import global style
import g from "../global.module.css";
// Import dog image
import dogz from "../assets/images/dog-6.png";

function AllDogs() {
    // Initialize state to store dogs, categories, and the selected category
    const [dogs, setDogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    // Fetch all dogs from the API
    const fetchDogs = async () => {
        fetch("http://localhost:3000/dogs")
            .then((res) => res.json())
            .then((data) => setDogs(data))
            .catch((err) => console.error("Error fetching dogs:", err));
    };

    // Fetch all categories from the API
    const fetchCategories = async () => {
        console.log("Fetching categories...");
        fetch("http://localhost:3000/categories")
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched categories:", data);
                setCategories(data);
            })
            .catch((err) => console.error("Error fetching categories:", err));
    };

    // Run the fetch functions when the component first mounts
    useEffect(() => {
        fetchDogs();
        fetchCategories();
    }, []);

    // Handle deleting a dog data from the list
    const handleDogDeleted = (id) => {
        console.log("Deleting dog with ID:", id);
        setDogs((prevDogs) => {
            const updatedDogs = prevDogs.filter((dog) => dog.id !== id);
            console.log("Updated dogs list:", updatedDogs);
            return updatedDogs;
        });
    };

    // Display the category
    // Filter dogs based on the selected category  
    const filteredDogs = selectedCategory
        ? dogs.filter((dog) => dog.category_id === parseInt(selectedCategory))
        : dogs;

    // Create a card layout for each dog with responsive flex/grid styling
    // Card content containing the dog's details
    // Fetch info on localhost:3000
    // Edit button navigate to EditDogForm to edit/update the dog info
    // Delete button that triggers the DeleteDogModal
    return (
        <main className={g["container"]}>
            <div>
                <div className={g["flex"]}>
                    <div>
                        <h1>Adopte Dogz</h1>
                        <h3>Helping Paws Find Loving Homes</h3>
                        <h4>Every Tail Deserves a Happy Tale</h4>
                    </div>
                    <img src={dogz} alt="banner photo" width={400} />
                </div>
                <hr />
                <div className={g["containerSec"]}>
                    <Link
                        to="/add-dog"
                        className={`${g["button"]} ${g["small"]} ${g["margin"]}`}
                    >
                        <button className={g["button2"]}>Add New Dog</button>
                    </Link>
                    <select
                        className={`${g["buttonSelect"]} ${g["small"]} ${g["margin"]}`}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={g['grid-container']}>
                    
                    {filteredDogs.map((dog) => (
                        <div className={`${g['col-4']} ${g['flex']} ${g['flex-grow']}`} key={dog.id}>
                            <div className={g["card"]}>
                            <img
                                src={`http://localhost:3000/images/${dog.image}`}
                                alt={dog.name}
                            />
                            <div className={g['card-content']}>
                            <h2>{dog.name}</h2>
                            <p>Breed: {dog.breed}</p>
                            <p>Age (month): {dog.age}</p>
                            <p>Category: {dog.category}</p>
                            <div>
                                <Link
                                    className={g["button"]}
                                    to={`/edit-dog/${dog.id}`}
                                >
                                    <button className={g["button2"]}>Edit</button>
                                </Link>
                                <DeleteDogModal
                                    dog={dog}
                                    onDogDeleted={handleDogDeleted}
                                />
                            </div>
                            </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default AllDogs;