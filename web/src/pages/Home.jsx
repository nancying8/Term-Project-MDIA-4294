// import link to able to navigate to other pages
import { Link } from 'react-router';
// import global styles and specific styles 'g'
import g from '../global.module.css';

// import the home page
// adding the sign in and sign up buttons
// and the welcome message

function Home() {

    return (
        <main 
       
        className={`${g['container']} ${g["full-width"]} ${g['banner']}`}>
            <div className={`${g['grid-container']} ${g["banner__content"]} ${g["text-center"]}`}>
                <div className={g['col-12']}>
                    <h1 className={g['h1']}>Welcome to My Little Dogz</h1>
                    <h3>Join our community of pet lovers</h3>
                    <h3>Sign up and share adoption info</h3>
                    <div className={g["banner__buttons"]}>
                        <Link to="/sign-up" className={`${g['button']} ${g["success"]}`}>Sign Up</Link>
                        <Link to="/sign-in" className={`${g['button']}`}>Sign In</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home;