import React, { useEffect, useState } from 'react'
import { TextField, Button, Grid, MenuItem, Select } from '@mui/material';
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
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


let mainPolls;

const PollsAdmin = () => {
    document.title = 'Polls-Admin - Interax';


    const [polls, setPolls] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState();
    const [numberOfOptions, setNumberOfOptions] = useState(2);
    const [question, setQuestion] = useState('');

    const postPollHandler = () => {
        if (question.length < 5) {
            toast.error('Question must container 5 characters at least', { autoClose: 4000 });
            return;
        }

        let options = [];
        for (let i = 1; i <= numberOfOptions; i++) {
            const element = document.getElementById(`option-${i}`);
            if (element.value.length === 0) {
                toast.error('Options cannot be empty', { autoClose: 4000 });
                return;
            }
            options.push(element.value);
        }

        setIsLoading(true);

        fetch('https://dtlforum-backend.vercel.app/postPoll', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ question: question, numberOfOptions: numberOfOptions, options: options, username: localStorage.getItem('username'), email: localStorage.getItem('email'), userId: localStorage.getItem('userId') })
        })
            .then(res => res.json())
            .then(data => {
                setIsLoading(false);
                if (data.success === false) {
                    toast.error(data.msg, { autoClose: 4000 });
                }
                else {
                    toast.success(data.msg, { autoClose: 4000 });
                    window.location.replace('https://interax.netlify.app/mainLoggedInAdmin/polls');
                }
            })
            .catch(err => {
                setIsLoading(false);
                console.log("Error connecting to server");
                toast.error("Error connecting to server", { autoClose: 4000 });
            })
    }

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
        fetch('https://dtlforum-backend.vercel.app/getPolls', {
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
                    window.location.replace('https://interax.netlify.app/adminLogin');
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
    }, []);

    return <>
        <ToastContainer autoClose={4000} hideProgressBar={true} limit={1} closeButton={true} position={'top-right'}></ToastContainer>
        <div className='linearProgressContainer'>
            {isLoading && <LinearProgress></LinearProgress>}
        </div>
        <div className='forumWrapper'>
            <div className='userBarContainer'>
                <button style={{ margin: '0.4em', width: '3em' }} className='button' onClick={() => { window.location.replace('/mainLoggedInAdmin/home') }}><AdminPanelSettingsIcon sx={{ margin: '-0.35em' }} /></button>
                <button style={{ margin: '0.4em', width: '3em' }} className='button' onClick={() => { Logout() }}><LogoutIcon sx={{ margin: '-0.35em' }} /></button>
                <Link to='/mainLoggedInAdmin/userInfo' style={{ textDecoration: 'none', color: '#82009c' }}>
                    <div className='loggedInAsTextContainer' style={{ display: 'inline', float: 'right' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <AccountCircleIcon sx={{ margin: '0.075em 0' }} /><p className='loggedInAsText'>{localStorage.getItem('username')}</p>
                        </div>
                    </div>
                </Link>
            </div>
            <hr />
            <div className='pageHeading'>Polls</div>
            <div className='searchContainer'>
                <input className='search' placeholder='Search' value={searchInput} onChange={(e) => {
                    setSearchInput(e.target.value)
                }}></input>
                <button className='searchButton' onClick={searchHandler}><SearchIcon sx={{ marginBottom: '-0.2em' }} /></button>
            </div>
            <div className='postsWrapper'>
                <div className='addPollContainer'>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField variant='outlined' size='small' sx={{ margin: '0.5em' }} label='Question' value={question} onChange={(e) => { setQuestion(e.target.value) }}></TextField>
                        <div>
                            &nbsp; Number Of Options : <Select size='small' sx={{ margin: '0.5em', minWidth: "2em", alignSelf: 'center' }} value={numberOfOptions} onChange={(e) => setNumberOfOptions(e.target.value)} >

                                {[...Array(10).keys()].map((e, i) =>
                                    i >= 1 &&
                                    <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>)
                                }
                            </Select>
                        </div>
                        <div className='optionsContainer'>
                            {[...Array(numberOfOptions).keys()].map((e, i) =>
                                <TextField variant='outlined' size='small' sx={{ margin: '0.5em' }} id={`option-` + (i + 1)} label={`Option ` + (i + 1)} key={i}></TextField>)
                            }

                        </div>
                    </div>
                    <div className='buttonWrapper'>
                        <button className='button' style={{ margin: '1em' }} onClick={postPollHandler}><p className='centerText buttonText' >POST</p></button>
                    </div>
                </div>
                {polls.map((poll, i) => {
                    return <div className='pollContainer'>
                        <div className="pollQuestion">
                            {poll.question}
                        </div>
                        <div className="pollTimeContainer">
                            <div className="totalVotes">Total Votes : {poll.totalVotes}</div>
                            <div className="pollTime">{poll.time}</div>
                        </div>
                        <div className="pollGraph">
                            <div>
                                <BarChart
                                    width={0.8 * window.screen.width}
                                    height={0.4 * window.screen.height}
                                    data={poll.data}
                                    margin={{
                                        top: 10,
                                        right: 10,
                                        left: 10,
                                        bottom: 10,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="option" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="votes" fill="#8884d8" />
                                </BarChart>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    </>
}

export default PollsAdmin;   