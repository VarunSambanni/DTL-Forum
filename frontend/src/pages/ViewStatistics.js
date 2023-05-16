import React, { useEffect, useState } from 'react'
import { TextField, Button, MenuItem, Grid, Checkbox } from '@mui/material';
import Select from '@mui/material/Select';
import { ToastContainer, toast } from 'react-toastify';
import '../index.css'
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import Logout from '../utils/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

ChartJS.register(ArcElement, Tooltip, Legend);

const ViewStatistics = () => {
    document.title = 'View Statistics-Admin - Interax';
    const [isLoading, setIsLoading] = useState(false);
    const [stats, setStats] = useState([]);
    const [userPostsCount, setUserPostsCount] = useState({}); // userId -> count
    const [userRepliesCount, setUserRepliesCount] = useState({}); // username -> count
    const [usersList, setUsersList] = useState([]);
    const [sortValue, setSortValue] = useState('Posts');

    if (localStorage.getItem("lineChartData") === null) {
        localStorage.setItem("lineChartData", JSON.stringify([]));
    }

    const pieChartData = {
        labels: ['Academics', 'Placements/Internships', 'Miscellaneous',],
        datasets: [
            {
                label: '# of Posts',
                data: stats.length > 0 ? [stats[1][0].length, stats[1][1].length, stats[1][2].length] : [0, 0, 0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    useEffect(() => {
        setIsLoading(true);
        fetch('https://dtlforum-backend.vercel.app/getStatsAdmin', {
            method: "GET",
            headers: {
                'x-access-token': localStorage.getItem('token')
            },
        })
            .then(res => res.json())
            .then(data => {
                setStats([]);
                setUsersList([]);
                setUserPostsCount({});
                setUserRepliesCount({});
                let datePosts = {};
                let lineChartData = [];
                stats.push(data.data[0]);
                stats.push(data.data[1]);
                stats.push(data.data[2]);
                setStats(stats);
                console.log("stats => ", stats);
                for (let i = 0; i < stats[0].length; i++) {
                    delete stats[0][i].password;
                    userPostsCount[stats[0][i].userId] = 0;
                    userRepliesCount[stats[0][i].username] = 0;
                }
                // Initializing map for dates
                for (let i = 0; i < stats[1][0].length; i++) {
                    datePosts[stats[1][0][i].time.split(' ')[0]] = 0;
                }
                for (let i = 0; i < stats[1][1].length; i++) {
                    datePosts[stats[1][1][i].time.split(' ')[0]] = 0;
                }
                for (let i = 0; i < stats[1][2].length; i++) {
                    datePosts[stats[1][2][i].time.split(' ')[0]] = 0;
                }

                for (let i = 0; i < stats[1][0].length; i++) {
                    userPostsCount[stats[1][0][i].userId]++;
                    datePosts[stats[1][0][i].time.split(' ')[0]]++;
                    for (let j = 0; j < stats[1][0][i].answers.length; j++) {
                        userRepliesCount[stats[1][0][i].answers[j].username]++;
                    }
                }
                for (let i = 0; i < stats[1][1].length; i++) {
                    userPostsCount[stats[1][1][i].userId]++;
                    datePosts[stats[1][1][i].time.split(' ')[0]]++;
                    for (let j = 0; j < stats[1][1][i].answers.length; j++) {
                        userRepliesCount[stats[1][1][i].answers[j].username]++;
                    }

                }
                for (let i = 0; i < stats[1][2].length; i++) {
                    userPostsCount[stats[1][2][i].userId]++;
                    datePosts[stats[1][2][i].time.split(' ')[0]]++;
                    for (let j = 0; j < stats[1][2][i].answers.length; j++) {
                        userRepliesCount[stats[1][2][i].answers[j].username]++;
                    }
                }
                console.log("dateposts ", datePosts);
                for (const date in datePosts) {
                    lineChartData.push({ date: date, posts: datePosts[date] });
                }
                lineChartData.sort((a, b) => {
                    if (a.date > b.date) {
                        return 1;
                    }
                    if (a.date < b.date) {
                        return -1;
                    }
                    return 0;
                })
                localStorage.setItem("lineChartData", JSON.stringify(lineChartData));
                console.log("lineChartData ", lineChartData);
                setUserPostsCount(userPostsCount);
                setUserRepliesCount(userRepliesCount);
                setUsersList(data.data[0]);
                console.log("ok ", usersList);

                setIsLoading(false);
                if (data.success === false) {
                    toast.error(data.msg, { autoClose: 4000 });
                }
            })
            .catch(err => {
                setIsLoading(false);
                console.log("Error connecting to server ", err);
                toast.error("Error connecting to server", { autoClose: 4000 });
            })
    }, []);

    useEffect(() => {
        console.log("Current SortValue : ", sortValue);
        const tempUsersList = usersList
        if (sortValue === 'Posts') { // Works opposite
            tempUsersList.sort((a, b) => {
                if (userPostsCount[a.userId] > userPostsCount[b.userId]) {
                    return -1;
                }
                if (userPostsCount[a.userId] < userPostsCount[b.userId]) {
                    return 1;
                }
                return 0;
            })
        }
        else if (sortValue === "Score") {
            tempUsersList.sort((a, b) => {
                if (a.points > b.points) {
                    return -1;
                }
                if (a.points < b.points) {
                    return 1;
                }
                return 0;
            })
        }
        else {
            tempUsersList.sort((a, b) => {
                if (userRepliesCount[a.username] > userRepliesCount[b.username]) {
                    return -1;
                }
                if (userRepliesCount[a.username] < userRepliesCount[b.username]) {
                    return 1;
                }
                return 0;
            })
        }
        setUsersList(tempUsersList);
    }, [sortValue]);

    const sortValueHandler = (event) => {
        setSortValue(event.target.value);
    }

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
            <div className='pageHeading'>Statistics</div>
            <div className='postsWrapper' style={{ backgroundColor: 'rgb(242, 242, 255)' }} >
                <div className='pieChartContainer' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Grid container style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Grid item md={4} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ minHeight: '22em', maxWidth: '60%', minWidth: '50%', overflowX: 'auto' }}>
                                <p className='subtitle'>Category wise posts</p>
                                <Pie data={pieChartData} />
                            </div>
                        </Grid>
                        <Grid item md={4} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <div className="infoContainer">
                                <div className='linearProgressContainer' style={{ backgroundColor: 'rgb(208, 216, 255)' }}> {stats.length === 0 && <LinearProgress />}</div>
                                <pre style={{ margin: '0.2em 0em', padding: '0em' }}>Number of Users : {stats.length > 0 ? stats[0].length : '  '}</pre>
                                <pre style={{ margin: '0.2em 0em', padding: '0em' }}>Posts : {stats.length > 0 ? stats[1][0].length + stats[1][1].length + stats[1][2].length : '  '}</pre>
                                <pre style={{ margin: '0.2em 0em', padding: '0em' }}>Announcements : {stats.length > 0 ? stats[2] : '  '}</pre>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className='pieChartContainer'>
                    <p className='subtitle'>Activity</p>
                    <LineChart width={1400} height={300} data={JSON.parse(localStorage.getItem("lineChartData")).length > 0 ? JSON.parse(localStorage.getItem("lineChartData")) : []}>
                        <Line type="monotone" dataKey="posts" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="date" />
                        <YAxis />
                    </LineChart>
                </div>

                <div classname="usersList">
                    <p className='subtitle'>Users List</p>

                    <div className='searchContainer'>
                        <div>Sort By : &nbsp;</div>
                        <select value={sortValue} onChange={sortValueHandler}>
                            <option value="Posts" >Posts</option>
                            <option value="Score" >Score</option>
                            <option value="Replies">Replies</option>
                        </select>
                    </div>
                    {usersList.length > 0 &&
                        <TableContainer component={Paper}>
                            <Table sx={{ height: "max-content" }} >
                                <TableHead sx={{ border: '1px solid black', backgroundColor: '#e0faff' }}>
                                    <TableRow >
                                        <TableCell align="center" sx={{ border: '1px solid black' }}>Username</TableCell>
                                        <TableCell align="center" sx={{ border: '1px solid black' }}>Email</TableCell>
                                        <TableCell align="center" sx={{ border: '1px solid black' }}>UserID</TableCell>
                                        <TableCell align="center" sx={{ border: '1px solid black' }}>Year</TableCell>
                                        <TableCell align="center" sx={{ border: '1px solid black' }}>Posts</TableCell>
                                        <TableCell align="center" sx={{ border: '1px solid black' }}>Replies</TableCell>
                                        <TableCell align="center" sx={{ border: '1px solid black' }}>Score</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {usersList.map((user, idx) => (
                                        <TableRow sx={{ border: '1px solid black' }}>
                                            <TableCell align="left" >{user.username}</TableCell>
                                            <TableCell align="left">{user.email}</TableCell>
                                            <TableCell align="left">{user.userId}</TableCell>
                                            <TableCell align="left">{user.year}</TableCell>
                                            <TableCell align="left">{userPostsCount[user.userId]}</TableCell>
                                            <TableCell align="left">{userRepliesCount[user.username]}</TableCell>
                                            <TableCell align="left">{user.points == 0.5 ? 0.25 : user.points == 1 ? 0.5 : user.points == 0 ? 0 : Math.log2(user.points).toFixed(4)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                </div>
            </div>
        </div>
    </>
}

export default ViewStatistics;