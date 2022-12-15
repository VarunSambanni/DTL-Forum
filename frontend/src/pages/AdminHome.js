import React, { useEffect, useState } from 'react'
import { TextField, Button, Grid } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import Post from '../components/Post';
import NavbarForum from '../components/NavbarForum';
import '../index.css'
import LinearProgress from '@mui/material/LinearProgress';
import LogoutIcon from '@mui/icons-material/Logout';
import Logout from '../utils/Logout'
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Linkify from 'react-linkify'
import ReactMarkdown from "react-markdown";
import AnnouncementIcon from '@mui/icons-material/Announcement';
import AddCommentIcon from '@mui/icons-material/AddComment';


const AdminHome = () => {
    document.title = 'Home-Admin - Interax';
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:5000/announcementsAdmin', {
            method: "GET",
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                setIsLoading(false);
                if (data.success === false) {
                    toast.error(data.msg, { autoClose: 4000 });
                }
                setPosts(data.posts);
            })
            .catch(err => {
                setIsLoading(false);
                console.log("Error connecting to server");
                toast.error("Error connecting to server", { autoClose: 4000 });
            })
    }, []);

    return <>
        <ToastContainer autoClose={4000} hideProgressBar={true} limit={1} closeButton={true} position={'top-right'}></ToastContainer>
        <div className='linearProgressContainer'>
            {isLoading && <LinearProgress></LinearProgress>}
        </div>
        <div className='forumWrapper'>
            <button style={{ margin: '0.4em', width: '3em' }} className='button' onClick={() => { Logout() }}><LogoutIcon sx={{ margin: '-0.35em' }} /></button>
            <Link to='/mainLoggedInAdmin/userInfo' style={{ textDecoration: 'none', color: '#82009c' }}>
                <div className='loggedInAsTextContainer' style={{ display: 'inline', float: 'right' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <AccountCircleIcon sx={{ margin: '0.075em 0' }} /><p className='loggedInAsText'>{localStorage.getItem('username')}</p>
                    </div>
                </div>
            </Link>
            <hr />
            <div className='postsWrapper'>
                <div className='adminHomeHeading'>Admin Home </div>
                <div className='adminMenu'>
                    <Grid container>
                        <Grid item md={6} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <div className='adminMenuOption'>
                                <div className='adminOptionContainer'>
                                    <AnnouncementIcon
                                        sx={{ transform: 'scale(2.5)', margin: '0.075em 0', height: 'fit-content', padding: '0.9em' }}
                                        onClick={() => window.location.replace('/mainLoggedInAdmin/announcements')}>
                                    </AnnouncementIcon>
                                    <div className='optionText'>
                                        <p className='innnerOptionText'>View</p>
                                        <p className='innnerOptionText'>Announcements</p>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={6} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <div className='adminMenuOption'>
                                <div className='adminOptionContainer'>
                                    <AddCommentIcon
                                        sx={{ transform: 'scale(2.5)', margin: '0.075em 0', height: 'fit-content', padding: '0.9em' }}
                                        onClick={() => window.location.replace('/mainLoggedInAdmin/postAnnouncement')}>
                                    </AddCommentIcon>
                                    <p className='optionText'>
                                        <p className='innnerOptionText'>Post</p>
                                        <p className='innnerOptionText'>Announcement</p>
                                    </p>
                                </div>
                            </div>
                        </Grid>
                    </Grid >
                </div>
            </div>
        </div>
    </>
}

export default AdminHome;   