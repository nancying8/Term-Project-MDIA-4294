import React, { useState } from 'react';
import g from '../global.module.css';

import bannerImage from '../assets/images/banner-dog.png';

function SignUp() {

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
        .then( response => response.json() )
        .then(returnedJSON => {
            console.log(returnedJSON);
        });

    };    

    return (
        <main style={{backgroundImage: `url(${bannerImage})`}} className={`${g['container']} ${g["full-width"]} ${g['banner']}`}>
            <div className={`${g['grid-container']} ${g["banner__content"]}`}>
                <div className={g['col-12']}>
                    <div className={`${g['card']} ${g['card--w-padding']}`}>
                        <h1 className={g['h1']}>Register</h1>
                        <form onSubmit={handleSubmit} className={`${g['form-group']} ${g["form--full"]}`}>
                            <div >
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email"
                                    placeholder='Email'
                                    required
                                    onChange={ (event) => {
                                        setFormData({  ...formData, email: event.target.value });
                                    }}
                                />
                            </div>
                            <div >
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    placeholder='Password'
                                    name="password" 
                                    required
                                    onChange={ (event) => {
                                        setFormData({ ...formData, password: event.target.value });
                                    } }
                                />
                            </div>
                            <div >
                                <label htmlFor="confirm-password">Confirm Password</label>
                                <input 
                                    type="password" id="confirm-password" 
                                    placeholder='Retype Password'
                                    name="confirm-password" 
                                    onChange={ (event) => {
                                        setFormData( { ...formData, confirmPassword: event.target.value } );
                                    } }
                                />
                            </div>
                            <input type="submit" value="Register" className={`${g["button"]} ${g["success"]} `} />

                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SignUp;