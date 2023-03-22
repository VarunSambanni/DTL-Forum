import React, { useEffect, useState } from 'react'
import { TextField, Button, Grid, Select, MenuItem } from '@mui/material';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Post from '../components/Post';
import NavbarForum from '../components/NavbarForum';
import '../index.css'
import LinearProgress from '@mui/material/LinearProgress';
import RefreshIcon from '@mui/icons-material/Refresh';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import Logout from '../utils/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Drawer } from "@mui/material";
import ListIcon from '@mui/icons-material/List';
import ForumIcon from '@mui/icons-material/Forum';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';



const Forum = () => {
    document.title = 'Forum - Interax';
    const [category, setCategory] = useState('1st Cat');
    const [posts, setPosts] = useState([]);
    const [posts1, setPosts1] = useState([]);
    const [posts2, setPosts2] = useState([]);
    const [posts3, setPosts3] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [forumUpdate, setForumUpdate] = useState(false);
    const [searchInput, setSearchInput] = useState();
    const [filterValue, setFilterValue] = useState('Content');
    const [showDrawer, setShowDrawer] = useState(true);

    const searchHandler = () => {
        let searchResults = [];

        if (category === '1st Cat') {
            for (let i = 0; i < posts[0].length; i++) {
                if (filterValue === 'Content') {
                    if (posts[0][i].body.toLowerCase().match(RegExp(searchInput.toLowerCase())) !== null || posts[0][i].title.toLowerCase().match(RegExp(searchInput.toLowerCase()))) {
                        searchResults.push(posts[0][i]);
                    }
                }
                else {
                    if (posts[0][i].username === searchInput.trim()) {
                        searchResults.push(posts[0][i]);
                    }
                }
            }
            setPosts1(searchResults);
        }
        else if (category === '2nd Cat') {
            for (let i = 0; i < posts[1].length; i++) {
                if (filterValue === 'Content') {
                    if (posts[1][i].body.toLowerCase().match(RegExp(searchInput.toLowerCase())) !== null || posts[1][i].title.toLowerCase().match(RegExp(searchInput.toLowerCase()))) {
                        searchResults.push(posts[1][i]);
                    }
                }
                else {
                    if (posts[1][i].username === searchInput.trim()) {
                        searchResults.push(posts[1][i]);
                    }
                }
            }
            setPosts2(searchResults);
        }
        else {
            for (let i = 0; i < posts[2].length; i++) {
                if (filterValue === 'Content') {
                    if (posts[2][i].body.toLowerCase().match(RegExp(searchInput.toLowerCase())) !== null || posts[2][i].title.toLowerCase().match(RegExp(searchInput.toLowerCase()))) {
                        searchResults.push(posts[2][i]);
                    }
                }
                else {
                    if (posts[2][i].username == searchInput.trim()) {
                        searchResults.push(posts[2][i]);
                    }
                }
            }
            setPosts3(searchResults);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        fetch('https://dtlforum-backend.vercel.app/forum', {
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
                    window.location.replace('https://interax.netlify.app/login');
                }
                setPosts(data.posts); data.posts[0].reverse();
                data.posts[1].reverse();
                data.posts[2].reverse();
                setPosts1(data.posts[0]);
                setPosts2(data.posts[1]);
                setPosts3(data.posts[2]);
            })
            .catch(err => {
                setIsLoading(false);
                console.log("Error connecting to server from Forum");
                toast.error("Error connecting to server", { autoClose: 4000 });
            })
    }, [forumUpdate]);

    return <>
        <ToastContainer autoClose={4000} hideProgressBar={true} limit={1} closeButton={true} position={'top-right'}></ToastContainer>
        <div className='linearProgressContainer'>
            {isLoading && <LinearProgress></LinearProgress>}
        </div>
        <div className='userBarContainer'>
            <NavbarForum />
            <button style={{ margin: '0.4em', width: '3em' }} className={`button`} onClick={() => setForumUpdate(!forumUpdate)} ><RefreshIcon sx={{ margin: '-0.35em' }} /></button>
            <button style={{ margin: '0.4em', width: '3em' }} className='button' onClick={() => { Logout() }}><LogoutIcon sx={{ margin: '-0.35em' }} /></button>
            <Link to='/mainLoggedIn/userInfo' style={{ textDecoration: 'none', color: '#82009c', }}>
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
                            <li className='guideline'>Before posting something, check if the same post already exists using the search feature </li>
                            <li className='guideline'>Announcements page contains posts made by the college, so its recommended that you visit it regularly</li>
                            <li className='guideline'>For any questions or problems faced, mail us at : rvcolforum@gmail.com</li>
                        </ul>
                    </div>
                </div>
            </Grid>
            <Grid item md={showDrawer ? 9.8 : 12} sm={12}>
                <div className='forumWrapper'>
                    <div className='pageHeading'>Forum</div>
                    <div className='categoriesWrapper'>
                        <Grid container sx={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Grid item md={4} sm={4} xs={12}>
                                <h4 onClick={() => setCategory('1st Cat')} className={`centerText category ${category === '1st Cat' ? 'selectedCategory' : null}`}>Academics</h4>
                            </Grid>
                            <Grid item md={4} sm={4} xs={12}>
                                <h4 onClick={() => setCategory('2nd Cat')} className={`centerText category ${category === '2nd Cat' ? 'selectedCategory' : null}`}>Placements/Internships</h4>
                            </Grid>
                            <Grid item md={4} sm={4} xs={12}>
                                <h4 onClick={() => setCategory('3rd Cat')} className={`centerText category ${category === '3rd Cat' ? 'selectedCategory' : null}`}>Miscellaneous</h4>
                            </Grid>
                        </Grid>
                    </div>
                    <hr></hr>
                    <Grid container sx={{
                        backgroundColor: '#f5f2f2', marginLeft: '0.4em', maxWidth: '99%', boxShadow: 'rgba(0, 0, 0, 0.35) 0.1em 0.1em 0.4em ;',
                    }}>
                        < Grid item md={3} xs={12} >
                            <div className='searchContainer'>
                                <input className='search' placeholder='Search' value={searchInput} onChange={(e) => {
                                    setSearchInput(e.target.value)
                                }}></input>
                                <button className='searchButton' onClick={searchHandler}><SearchIcon sx={{ marginBottom: '-0.2em' }} /></button>
                            </div>
                        </Grid>
                        <Grid item md={3} xs={6}>
                            <div className='searchContainer'>
                                <button className='searchButton' ><TuneIcon sx={{ marginBottom: '-0.2em' }}></TuneIcon></button>
                                <Select size='small' sx={{ marginTop: '-0.4em', minWidth: '5em', maxHeight: '2.5em', alignSelf: 'center' }} value={filterValue} onChange={(e) => { setFilterValue(e.target.value) }}>
                                    <MenuItem value={'Content'}>Content</MenuItem>
                                    <MenuItem value={'Posted By'}>Posted By</MenuItem>
                                </Select>
                            </div>
                        </Grid>
                        <Grid item md={6} xs={6}>
                            <div className='searchContainer announcementsButtonContainer'>
                                <Link to='/mainLoggedIn/announcements' style={{ textDecoration: 'none', color: '#82009c' }}>
                                    <button className='announcementsButton'>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <AnnouncementIcon sx={{ margin: '0.075em 0' }} /><p className='loggedInAsText'>Announcements</p>
                                        </div>
                                    </button>
                                </Link>
                            </div>
                        </Grid>
                    </Grid>
                    {
                        category === '1st Cat' &&
                        <div className='postsWrapper'>
                            {posts1.length === 0 && <p className='centerText' style={{ fontSize: '1.2rem' }}>No posts yet</p>}
                            {
                                posts1.map((post, index) => {
                                    return <Post key={index} title={post.title} year={post.year} body={post.body} username={post.username} email={post.email} answers={post.answers} postId={post.postId} id={post._id} category={post.category} upvotes={post.upvotes} time={post.time} forumUpdate={forumUpdate} setForumUpdate={setForumUpdate} />
                                })
                            }
                        </div>
                    }
                    {
                        category === '2nd Cat' &&
                        <div className='postsWrapper'>
                            {posts2.length === 0 && <p className='centerText' style={{ fontSize: '1.2rem' }}>No posts yet</p>}
                            {
                                posts2.map((post, index) => {
                                    return <Post key={index} title={post.title} year={post.year} body={post.body} username={post.username} email={post.email} answers={post.answers} postId={post.postId} id={post._id} category={post.category} upvotes={post.upvotes} time={post.time} forumUpdate={forumUpdate} setForumUpdate={setForumUpdate} />
                                })
                            }
                        </div>
                    }
                    {
                        category === '3rd Cat' &&
                        <div className='postsWrapper'>
                            {posts3.length === 0 && <p className='centerText' style={{ fontSize: '1.2rem' }}>No posts yet</p>}
                            {
                                posts3.map((post, index) => {
                                    return <Post key={index} title={post.title} year={post.year} body={post.body} username={post.username} email={post.email} answers={post.answers} postId={post.postId} id={post._id} category={post.category} upvotes={post.upvotes} time={post.time} forumUpdate={forumUpdate} setForumUpdate={setForumUpdate} />
                                })
                            }
                        </div>
                    }
                </div >
            </Grid >
        </Grid>
    </>
}

export default Forum