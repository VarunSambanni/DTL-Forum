import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Drawer } from "@mui/material";
import ListIcon from '@mui/icons-material/List';
import ForumIcon from '@mui/icons-material/Forum';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import PollIcon from '@mui/icons-material/Poll';

const NavbarForum = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    return <>
        <button style={{ margin: '0.4em', width: '3em' }} className={`button drawer`} onClick={() => setIsDrawerOpen(true)}><ListIcon sx={{ margin: '-0.35em' }} /></button>
        <Drawer achor='left' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
            <div className="drawerListWrapper2" style={{ padding: '0em' }}>
                <ul className="drawerLinks">
                    <li className="drawerLink"><Link to='/mainLoggedIn/forum' style={{ textDecoration: 'none', color: `${document.title.split('-')[0] === "Forum " ? "black" : "#82009c"}` }}><div className="link">{document.title.split('-')[0] === "Forum " ? <span>➔</span> : <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}<ForumIcon sx={{ margin: '-0.2em 0.2em' }} />Forum</div></Link></li>
                    <li className="drawerLink"><Link to='/mainLoggedIn/announcements' style={{ textDecoration: 'none', color: `${document.title.split('-')[0] === "Announcements " ? "black" : "#82009c"}` }}><div className="link">{document.title.split('-')[0] === "Announcements " ? <span>➔</span> : <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}<AnnouncementIcon sx={{ margin: '-0.2em 0.2em' }} />Announcements</div></Link></li>
                    <li className="drawerLink"><Link to='/mainLoggedIn/polls' style={{ textDecoration: 'none', color: `${document.title.split('-')[0] === "Polls " ? "black" : "#82009c"}` }}><div className="link">{document.title.split('-')[0] === "User Info " ? <span>➔</span> : <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}<PollIcon sx={{ margin: '-0.2em 0.2em' }} />Polls</div></Link></li>
                    <li className="drawerLink"><Link to='/mainLoggedIn/postForum' style={{ textDecoration: 'none', color: `${document.title.split('-')[0] === "Post Forum " ? "black" : "#82009c"}` }}><div className="link">{document.title.split('-')[0] === "Post Forum " ? <span>➔</span> : <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}<PostAddIcon sx={{ margin: '-0.2em 0.2em' }} />Post</div></Link></li>
                    <li className="drawerLink"><Link to='/mainLoggedIn/yourPosts' style={{ textDecoration: 'none', color: `${document.title.split('-')[0] === "Your Posts " ? "black" : "#82009c"}` }}><div className="link">{document.title.split('-')[0] === "Your Posts " ? <span>➔</span> : <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}<AccountBoxIcon sx={{ margin: '-0.2em 0.2em' }} />Your Posts</div></Link></li>
                    <li className="drawerLink"><Link to='/mainLoggedIn/topPosts' style={{ textDecoration: 'none', color: `${document.title.split('-')[0] === "Top Posts " ? "black" : "#82009c"}` }}><div className="link">{document.title.split('-')[0] === "Top Posts " ? <span>➔</span> : <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}<LocalFireDepartmentIcon sx={{ margin: '-0.2em 0.2em' }} />Top Posts</div></Link></li>
                    <li className="drawerLink"><Link to='/mainLoggedIn/userInfo' style={{ textDecoration: 'none', color: `${document.title.split('-')[0] === "User Info " ? "black" : "#82009c"}` }}><div className="link">{document.title.split('-')[0] === "User Info " ? <span>➔</span> : <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}<DisplaySettingsIcon sx={{ margin: '-0.2em 0.2em' }} />User Info</div></Link></li>
                </ul>
            </div>
            <div className='guidelinesContainer'>
                <h3 className='generalGuidelinesHeading'>General Guidelines</h3>
                <ul>
                    <li className='guideline'>Avoid posting or replying anything that contains any bad words, against someones's interests or considered obscene</li>
                    <li className='guideline'>Before posting something, check if the same post already exists using the search feature </li>
                    <li className='guideline'>Announcements page contains posts made by the college, so its recommended that you visit it regularly</li>
                    <li className='guideline'>For any questions or problems faced, mail us at : rvcolforum@gmail.com</li>
                </ul>
            </div>
        </Drawer>
    </>
}

export default NavbarForum;