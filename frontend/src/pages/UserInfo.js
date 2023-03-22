import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { TextField, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import '../index.css';
import NavbarForum from '../components/NavbarForum';
import Logout from '../utils/Logout';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ForumIcon from '@mui/icons-material/Forum';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';

const UserInfo = ({ isAdmin }) => {
    const [showDrawer, setShowDrawer] = useState(true);

    if (isAdmin === true) {
        console.log("Here right");
        document.title = 'User Info-Admin - Interax';
    }
    else {
        document.title = 'User Info - Interax';
    }
    return (
        <>
            <ToastContainer autoClose={4000} hideProgressBar={true} limit={1} closeButton={true} position={'top-right'}></ToastContainer>
            <div className='linearProgressContainer'>
            </div>
            <div className='userBarContainer'>
                {!isAdmin && <NavbarForum />}
                {isAdmin && <button style={{ margin: '0.4em', width: '3em' }} className='button' onClick={() => { window.location.replace('/mainLoggedInAdmin/home') }}><AdminPanelSettingsIcon sx={{ margin: '-0.35em' }} /></button>}
                <button style={{ margin: '0.4em', width: '3em' }} className='button' onClick={() => { Logout() }}><LogoutIcon sx={{ margin: '-0.35em' }} /></button>
                <Link to={isAdmin ? '/mainLoggedInAdmin/userInfo' : '/mainLoggedIn/userInfo'} style={{ textDecoration: 'none', color: '#82009c' }}>
                    <div className='loggedInAsTextContainer' style={{ display: 'inline', float: 'right' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <AccountCircleIcon sx={{ margin: '0.075em 0' }} /><p className='loggedInAsText'>{localStorage.getItem('username')}</p>
                        </div>
                    </div>
                </Link>
                <button className='menuButton' onClick={() => setShowDrawer(!showDrawer)}>MENU</button>
            </div>
            <Grid container >
                <Grid item md={2.2} sm={0} sx={{ display: showDrawer ? 'inline' : 'none' }} >
                    <div className="drawerListWrapper">
                        <ul className="drawerLinks">
                            <li className="drawerLink"><Link to='/mainLoggedIn/forum' style={{ textDecoration: 'none', color: `${document.title.split('-')[0] === "Forum " ? "black" : "#82009c"}` }}><div className="link">{document.title.split('-')[0] === "Forum " ? <span>➔</span> : <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}<ForumIcon sx={{ margin: '-0.2em 0.2em' }} />Forum</div></Link></li>
                            <li className="drawerLink"><Link to='/mainLoggedIn/announcements' style={{ textDecoration: 'none', color: `${document.title.split('-')[0] === "Announcements " ? "black" : "#82009c"}` }}><div className="link">{document.title.split('-')[0] === "Announcements " ? <span>➔</span> : <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}<AnnouncementIcon sx={{ margin: '-0.2em 0.2em' }} />Announcements</div></Link></li>
                            <li className="drawerLink"><Link to='/mainLoggedIn/postForum' style={{ textDecoration: 'none', color: `${document.title.split('-')[0] === "Post Forum " ? "black" : "#82009c"}` }}><div className="link">{document.title.split('-')[0] === "Post Forum " ? <span>➔</span> : <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}<PostAddIcon sx={{ margin: '-0.2em 0.2em' }} />Post</div></Link></li>
                            <li className="drawerLink"><Link to='/mainLoggedIn/yourPosts' style={{ textDecoration: 'none', color: `${document.title.split('-')[0] === "Your Posts " ? "black" : "#82009c"}` }}><div className="link">{document.title.split('-')[0] === "Your Posts " ? <span>➔</span> : <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}<AccountBoxIcon sx={{ margin: '-0.2em 0.2em' }} />Your Posts</div></Link></li>
                            <li className="drawerLink"><Link to='/mainLoggedIn/topPosts' style={{ textDecoration: 'none', color: `${document.title.split('-')[0] === "Top Posts " ? "black" : "#82009c"}` }}><div className="link">{document.title.split('-')[0] === "Top Posts " ? <span>➔</span> : <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}<LocalFireDepartmentIcon sx={{ margin: '-0.2em 0.2em' }} />Top Posts</div></Link></li>
                            <li className="drawerLink"><Link to='/mainLoggedIn/userInfo' style={{ textDecoration: 'none', color: `${document.title.split('-')[0] === "User Info " ? "black" : "#82009c"}` }}><div className="link">{document.title.split('-')[0] === "User Info " ? <span>➔</span> : <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}<DisplaySettingsIcon sx={{ margin: '-0.2em 0.2em' }} />User Info</div></Link></li>
                        </ul>
                        <div className='guidelinesContainer'>
                            <h3 className='generalGuidelinesHeading'>General Guidelines</h3>
                            <ul>
                                <li className='guideline'>Avoid posting or replying anything that contains any bad words, against someones's interests or considered obscene</li>
                                <li className='guideline'>Before posting something, check if a similar post already exists using the search feature </li>
                                <li className='guideline'>Announcements page contains posts made by the college, so its recommended that you visit it regularly</li>
                                <li className='guideline'>For any questions or problems faced, mail us at : rvcolforum@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                </Grid>
                <Grid item md={showDrawer ? 9.8 : 12} sm={12}>
                    <div className='forumWrapper'>
                        <div className='pageHeading'>User Info</div>
                        <div className='postsWrapper'>
                            <div className='loginContainer' style={{ padding: '0.4em', fontSize: '0.95rem', margin: 'auto' }} >
                                <div className='loginForm'>
                                    <h4 className='centerText'>User Info</h4>
                                    <div className='userInfoText' style={{ display: 'flex', flexDirection: 'row' }}>
                                        <h4 style={{ margin: '0.2em', padding: '0em' }}>Username: </h4>
                                        <h4 style={{ margin: '0.2em', padding: '0em', fontWeight: '100' }}>{localStorage.getItem('username')}</h4>
                                    </div>
                                    <div className='userInfoText' style={{ display: 'flex', flexDirection: 'row' }}>
                                        <h4 style={{ margin: '0.2em', padding: '0em' }}>Email: </h4>
                                        <h4 style={{ margin: '0.2em', padding: '0em', fontWeight: '100' }}>{localStorage.getItem('email')}</h4>
                                    </div>
                                    <div className='userInfoText' style={{ display: 'flex', flexDirection: 'row' }}>
                                        <h4 style={{ margin: '0.2em', padding: '0em' }}>Year: </h4>
                                        <h4 style={{ margin: '0.2em', padding: '0em', fontWeight: '100' }}>{localStorage.getItem('year')}</h4>
                                    </div>
                                </div>
                            </div >
                        </div>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}


export default UserInfo;
