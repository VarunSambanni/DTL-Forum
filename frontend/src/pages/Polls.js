import React, { useEffect, useState } from 'react'
import { TextField, Button, Grid, Radio } from '@mui/material';
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
import PollIcon from '@mui/icons-material/Poll';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Poll from '../components/Poll';

let mainPolls;


const Polls = () => {
    document.title = 'Polls - Interax';

    const [polls, setPolls] = useState([]);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState();
    const [showDrawer, setShowDrawer] = useState(true);
    const [pollsUpdate, setPollsUpdate] = useState(false);

    const searchHandler = () => {
        let searchResults = [];
        if (searchInput.trim().length === 0) {
            setPolls(mainPolls);
            return;
        }
        for (let i = 0; i < mainPolls.length; i++) {
            if (mainPolls[i].question.toLowerCase().match(RegExp(searchInput.toLowerCase())) !== null) {
                searchResults.push(mainPolls[i]);
            }
        }
        setPolls(searchResults);
    }

    useEffect(() => {
        setIsLoading(true);
        fetch('https://dtlforum-backend.vercel.app/getPollsUsers', {
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
                    //window.location.replace('https://interax.netlify.app/adminLogin');
                }
                data.polls.reverse();
                let tempPolls = [];
                for (let i = 0; i < data.polls.length; i++) {
                    let pollData = [];
                    let totalVotes = 0;
                    for (let j = 0; j < data.polls[i].options.length; j++) {
                        totalVotes += data.polls[i].votes[j];
                        pollData.push({ option: data.polls[i].options[j], votes: data.polls[i].votes[j] });
                    }
                    tempPolls.push({ data: pollData, time: data.polls[i].time, question: data.polls[i].question, totalVotes: totalVotes, pollId: data.polls[i].pollId });
                }
                mainPolls = tempPolls;
                setPolls(tempPolls);
            })
            .catch(err => {
                setIsLoading(false);
                console.log("Error connecting to server");
                toast.error("Error connecting to server", { autoClose: 4000 });
            })
    }, [pollsUpdate]);

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
                        <li className="drawerLink"><Link to='/mainLoggedIn/polls' style={{ textDecoration: 'none', color: `${document.title.split('-')[0] === "Polls " ? "black" : "#82009c"}` }}><div className="link">{document.title.split('-')[0] === "User Info " ? <span>➔</span> : <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}<PollIcon sx={{ margin: '-0.2em 0.2em' }} />Polls</div></Link></li>
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
                    <div className='pageHeading'>Polls</div>
                    <div className='searchContainer'>
                        <input className='search' placeholder='Search' value={searchInput} onChange={(e) => {
                            setSearchInput(e.target.value)
                        }}></input>
                        <button className='searchButton' onClick={searchHandler}><SearchIcon sx={{ marginBottom: '-0.2em' }} /></button>
                    </div>
                    <div className='postsWrapper'>

                        {polls.map((poll, i) => {
                            return <Poll pollsUpdate={pollsUpdate} setPollsUpdate={setPollsUpdate} poll={poll} i={i}></Poll>
                        })}
                    </div>
                </div>
            </Grid>
        </Grid>
    </>
}

export default Polls;   