// Import React to use JSX
import React from "react";
// Import Link for navigation
import { Link } from "react-router-dom";
// Import styles
import h from './Header.module.css';
import g from '../global.module.css';
// Import dog image
import dog from '../assets/images/dog-1.png';

// 
function Header() {
    return (
        <header className={h['header']}>
            <div className={ `${g['container']} ${h['main-nav']}`}> 
                <Link to="/">
                <img src={dog} width={100}/>
                </Link>
                <h2>My Little Dogz</h2>
            </div>
        </header>
    )
}

export default Header;