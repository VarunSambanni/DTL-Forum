import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const Navbar = () => {

    return <>
        <div className="navbarWrapper">
            <ul className="navbarList">
                <li className="navbarLink"><Link to='/' style={{ textDecoration: 'none' }}><div className="link2"><HomeIcon /> <p className="linktext">Home</p> </div></Link></li>
                <li className="navbarLink"><Link to='/login' style={{ textDecoration: 'none' }}><div className="link2"><LoginIcon /> <p className="linktext">Login</p></div></Link></li>
                <li className="navbarLink"><Link to='/signup' style={{ textDecoration: 'none' }}><div className="link2"><GroupAddIcon /> <p className="linktext">Sign Up</p></div></Link></li>

            </ul>
        </div>
    </>
}

export default Navbar