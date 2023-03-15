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
import SearchIcon from '@mui/icons-material/Search';
import ForumIcon from '@mui/icons-material/Forum';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';

let mainPosts;

const Announcements = () => {
    document.title = 'Announcements - Interax';
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState();
    const [showDrawer, setShowDrawer] = useState(true);

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
        fetch('https://dtlforum-backend.vercel.app/announcements', {
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
        <div className='userBarContainer'>
            <NavbarForum />
            <button style={{ margin: '0.4em', width: '3em' }} className='button' onClick={() => { Logout() }}><LogoutIcon sx={{ margin: '-0.35em' }} /></button>
            <Link to='/mainLoggedIn/userInfo' style={{ textDecoration: 'none', color: '#82009c' }}>
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
                </div>
            </Grid>
            <Grid item md={showDrawer ? 9.8 : 12} sm={12}>
                <div className='forumWrapper'>
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
                                                <p className="bold" ><p className='announcementUsername'>{post.username}</p></p>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            })
                        }
                    </div>
                </div>
            </Grid>
        </Grid>
    </>
}

export default Announcements;   