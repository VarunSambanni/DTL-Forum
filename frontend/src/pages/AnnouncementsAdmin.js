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
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SearchIcon from '@mui/icons-material/Search';

let mainPosts;

const AnnouncementsAdmin = () => {
    document.title = 'Announcements-Admin - Interax';
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState();

    const searchHandler = () => {
        let searchResults = [];
        if (searchInput.trim().length === 0) {
            setPosts(mainPosts);
            return;
        }
        for (let i = 0; i < mainPosts.length; i++) {
            if (mainPosts[i].body.toLowerCase().match(RegExp(searchInput.toLowerCase())) !== null || mainPosts[i].title.toLowerCase().match(RegExp(searchInput.toLowerCase()))) {
                searchResults.push(mainPosts[i]);
            }
        }
        setPosts(searchResults);
    }

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
                    window.location.replace('http://localhost:3000/adminLogin');
                }
                data.posts.reverse();
                mainPosts = data.posts;
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
            <button style={{ margin: '0.4em', width: '3em' }} className='button' onClick={() => { window.location.replace('/mainLoggedInAdmin/home') }}><AdminPanelSettingsIcon sx={{ margin: '-0.35em' }} /></button>
            <button style={{ margin: '0.4em', width: '3em' }} className='button' onClick={() => { Logout() }}><LogoutIcon sx={{ margin: '-0.35em' }} /></button>
            <Link to='/mainLoggedInAdmin/userInfo' style={{ textDecoration: 'none', color: '#82009c' }}>
                <div className='loggedInAsTextContainer' style={{ display: 'inline', float: 'right' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <AccountCircleIcon sx={{ margin: '0.075em 0' }} /><p className='loggedInAsText'>{localStorage.getItem('username')}</p>
                    </div>
                </div>
            </Link>
            <hr />
            <div className='pageHeading'>Announcements</div>
            <div className='searchContainer'>
                <input className='search' placeholder='Search' value={searchInput} onChange={(e) => {
                    setSearchInput(e.target.value)
                }}></input>
                <button className='searchButton' onClick={searchHandler}><SearchIcon sx={{ marginBottom: '-0.2em' }} /></button>
            </div>
            <div className='postsWrapper'>
                {posts.length === 0 && <p className='centerText' style={{ fontSize: '1.2rem' }}>No posts yet</p>}
                {
                    posts.map((post, index) => {
                        return <Grid container>
                            <Grid item xs={12}>
                                <div className="postWrapper">
                                    <div className='titleWrapper'>
                                        <h4 className="title">{post.title.substring(post.title.length - 5) === '.html' ? post.title.substring(0, post.title.length - 5) : post.title.substring(post.title.length - 3) === '.md' ? post.title.substring(0, post.title.length - 3) : post.title}</h4>
                                        <p className="time">{post.time}</p>
                                        <hr />
                                    </div>
                                    <div className='bodyWrapper'>
                                        {
                                            post.title.substring(post.title.length - 5) === '.html' ?
                                                <pre style={{ maxHeight: '40em' }} dangerouslySetInnerHTML={{ __html: post.body }}></pre>
                                                :
                                                post.title.substring(post.title.length - 3) === '.md' ? <div style={{ maxHeight: '40em' }}> <ReactMarkdown>{post.body}</ReactMarkdown> </div> : <Linkify> <pre style={{ maxHeight: '40em' }} >{post.body}</pre>  </Linkify>
                                        }

                                    </div>
                                    <div className="emailWrapper">
                                        <p className="bold" >Posted By: <p className='announcementUsername'>{post.username}</p></p>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    })
                }
            </div>
        </div>
    </>
}

export default AnnouncementsAdmin;   