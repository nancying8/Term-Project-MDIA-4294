// import React from 'react';
// import usestate to manage state
import React, { useState } from 'react';
// import useNavigate to navigate between pages
import { useNavigate } from 'react-router-dom';
// import global styles and specific styles 'g'
import g from '../global.module.css';

// import the SignUp component
// This component is used to create a new user account
// It includes a form for the user to input their email, password, and confirm password
// When the form is submitted, it sends a POST request to the server to create a new user
// If the request is successful, it navigates to the '/alldogs' page
function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(returnedJSON => {
            console.log(returnedJSON);
            navigate("/alldogs"); 
        });
    };

    return (
        <main  className={`${g.container} ${g["full-width"]} ${g.banner}`}>
            <div className={`${g["grid-container"]} ${g["banner__content"]}`}>
                <div className={g["col-12"]}>
                    <div className={`${g.card} ${g["card--w-padding"]}`}>
                        <h1 className={g.h1}>Register</h1>
                        <form onSubmit={handleSubmit} className={`${g["form-group"]} ${g["form--full"]}`}>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    onChange={(event) => {
                                        setFormData({ ...formData, email: event.target.value });
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    onChange={(event) => {
                                        setFormData({ ...formData, password: event.target.value });
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm-password">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    name="confirm-password"
                                    placeholder="Retype Password"
                                    onChange={(event) => {
                                        setFormData({ ...formData, confirmPassword: event.target.value });
                                    }}
                                />
                            </div>
                            <input type="submit" value="Register" className={`${g.button} ${g.success}`} />
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SignUp;
