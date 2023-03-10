import React, { useEffect, useState } from 'react'
import { TextField, Button, MenuItem, Grid, Checkbox } from '@mui/material';
import Select from '@mui/material/Select';
import { ToastContainer, toast } from 'react-toastify';
import NavbarForum from '../components/NavbarForum';
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

ChartJS.register(ArcElement, Tooltip, Legend);

const PostAnnouncement = () => {
    document.title = 'View Statistics-Admin - Interax';
    const [isLoading, setIsLoading] = useState(false);
    const [stats, setStats] = useState([]);


    const pieChartData = {
        labels: ['Academics', 'Placements/Internships', 'Miscellaneous',],
        datasets: [
            {
                label: '# of Posts',
                data: stats.length > 0 ? stats[1] : [0, 0, 0],
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
                stats.push(data.data[0]);
                stats.push(data.data[1]);
                setStats(stats);
                setIsLoading(false)
                console.log("stats => ", stats);
                if (data.success === false) {
                    toast.error(data.msg, { autoClose: 4000 });
                }
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
            <div className='pageHeading'>View Statistics</div>
            <div className='postsWrapper' style={{ backgroundColor: 'rgb(242, 242, 255)' }} >
                <div className='pieChartContainer'>
                    <p className='subtitle'>Category wise posts</p>
                    <Pie data={pieChartData} />
                </div>

                <div classname="usersList">
                    <p className='subtitle'>Users List</p>
                    {stats.length > 0 &&
                        <Table component={Paper} >
                            <TableHead sx={{ border: '1px solid black' }}>
                                <TableRow>
                                    <TableCell align="center" sx={{ border: '1px solid black' }}>Username</TableCell>
                                    <TableCell align="center" sx={{ border: '1px solid black' }}>Email</TableCell>
                                    <TableCell align="center" sx={{ border: '1px solid black' }}>UserID</TableCell>
                                    <TableCell align="center" sx={{ border: '1px solid black' }}>Year</TableCell>
                                    <TableCell align="center" sx={{ border: '1px solid black' }}>Posts</TableCell>
                                    <TableCell align="center" sx={{ border: '1px solid black' }}>Replies</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{ border: '1px solid black' }}>
                                {stats[0].map((user) => (
                                    <TableRow sx={{ border: '1px solid black' }}>
                                        <TableCell align="left" >{user.username}</TableCell>
                                        <TableCell align="left">{user.email}</TableCell>
                                        <TableCell align="left">{user.userId}</TableCell>
                                        <TableCell align="left">{user.year}</TableCell>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left"></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    }
                </div>
            </div>
        </div>
    </>
}

export default PostAnnouncement;