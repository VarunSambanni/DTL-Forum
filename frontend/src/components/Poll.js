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


const Poll = ({ pollsUpdate, setPollsUpdate, poll, i }) => {
    const [selectedOption, setSelectedOption] = useState('');


    const optionChangeHandler = (e) => {
        console.log("Here ", e.target.value);
        fetch('https://dtlforum-backend.vercel.app/postVote', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ selectedOption: e.target.value, username: localStorage.getItem('username'), email: localStorage.getItem('email'), year: localStorage.getItem('year'), userId: localStorage.getItem('userId'), pollId: poll.pollId })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success === false) {
                    toast.error(data.msg, { autoClose: 4000 });
                }
                else {
                    if (data.msg === "Vote Submitted") {
                        setSelectedOption(e.target.value);
                        setPollsUpdate(!pollsUpdate);
                    }
                    toast.success(data.msg, { autoClose: 4000 });
                }
            })
    }

    return <>
        <div className='pollContainer'>
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
            <div className="optionsRadioButtonsContainer">
                {
                    poll.data.map((option, key) => {
                        return <div key={key} className="optionsRadioButton">
                            <Radio
                                size="small"
                                checked={selectedOption === option}
                                value={poll.data[key].option}
                                onChange={optionChangeHandler}
                                name="radio-buttons"
                            />
                            <div style={{ marginTop: '0.8em' }}>{poll.data[key].option}</div>
                        </div>
                    })
                }
            </div>
        </div>
    </>
}

export default Poll;