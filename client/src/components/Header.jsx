import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <nav>
        <div className="nav-wrapper">
            <h6 style={{ marginLeft: '10px', display: 'inline-block' }}><Link to={'/'}>Created for Frontend Forum Presentation</Link></h6>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to={'/about'}>About</Link></li>
            </ul>
        </div>
    </nav>
)

export default Header;