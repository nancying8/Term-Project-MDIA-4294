import { Link } from 'react-router';
import g from '../global.module.css';

import bannerImage from '../assets/images/banner-dog.png';

function Home() {

    return (
        <main style={{backgroundImage: `url(${bannerImage})`}} className={`${g['container']} ${g["full-width"]} ${g['banner']}`}>
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