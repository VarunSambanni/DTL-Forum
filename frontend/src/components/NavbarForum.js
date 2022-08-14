import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Drawer } from "@mui/material";
import ListIcon from '@mui/icons-material/List';
import ForumIcon from '@mui/icons-material/Forum';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import yourPosts from '../pages/YourPosts'

const NavbarForum = () => { // Navbar forum is just a button now
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return <>
        <button style={{ margin: '0.4em', width: '3em' }} className={`button drawer`} onClick={() => setIsDrawerOpen(true)}><ListIcon sx={{ margin: '-0.35em' }} /></button>
        <Drawer achor='left' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
            <div className="drawerListWrapper">
                <ul className="drawerLinks">
                    <li className="drawerLink"><Link to='/mainLoggedIn/forum' style={{ textDecoration: 'none' }}><div className="link"><ForumIcon /> Forum</div></Link></li>
                    <li className="drawerLink"><Link to='/mainLoggedIn/postForum' style={{ textDecoration: 'none' }}><div className="link"><PostAddIcon /> Post</div></Link></li>
                    <li className="drawerLink"><Link to='/mainLoggedIn/yourPosts' style={{ textDecoration: 'none' }}><div className="link"><AccountBoxIcon /> Your Posts</div></Link></li>
                    <li className="drawerLink"><Link to='/mainLoggedIn/topPosts' style={{ textDecoration: 'none' }}><div className="link"><LocalFireDepartmentIcon /> Top Posts</div></Link></li>
                </ul>
            </div>
        </Drawer>
    </>
    return <>
        <div className="navbarWrapper">
            <ul className="navbarList">
                <li className="navbarLink"><Link to='/mainLoggedIn/forum'>Forum</Link></li>
                <li className="navbarLink"><Link to='/mainLoggedIn/postForum'>Post</Link></li>
            </ul>
        </div>
    </>
}

export default NavbarForum;