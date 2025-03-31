import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import g from '../global.module.css';
import bannerImage from '../assets/images/banner-dog.png';

function SignIn( ) {

    const [loginSuccess, setLoginSuccess] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        if(loginSuccess) { navigate("/AllDogs") }
    }, [loginSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:3000/users/sign-in", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then( response => response.json() )
        .then( returnedData => {
            localStorage.setItem( "jwt-token", returnedData.token);
            setLoginSuccess(true);
        });

    };

    return (
        <main style={{ backgroundImage: `url(${bannerImage})` }} className={`${g['container']} ${g["full-width"]} ${g['banner']}`}>
            <div className={`${g['grid-container']} ${g["banner__content"]}`}>
                <div className={g['col-12']}>
                    <div className={`${g['card']} ${g['card--w-padding']}`}>
                        <h1 className={g['h1']}>Sign In</h1>
                        <form className={`${g['form-group']} ${g["form--full"]}`} onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    onChange={ (event) => {
                                        setFormData({ ...formData, email: event.target.value })
                                    } } 
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    required
                                    onChange={ (event) => {
                                        setFormData( {...formData, password: event.target.value} );
                                    } }
                                />
                            </div>
                            <input type="submit" value="Sign In" className={`${g["button"]} ${g["success"]}`} />
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SignIn;