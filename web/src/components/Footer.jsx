// Import React to use JSX
import React from "react";
// Import Styles
import f from './Footer.module.css';
import g from '../global.module.css';
// import dog image
import dog from '../assets/images/dog-1.png';

function Footer () {
  return (
    <footer className={f['footer-bg']}>
        <div className={`${g['container']} ${f['footer-content']}`}>
            <img src={dog} width={60} />
            <p>My Little Dogz</p>
            <p>© 2025</p>
        </div>
    </footer>
  );
}

export default Footer;