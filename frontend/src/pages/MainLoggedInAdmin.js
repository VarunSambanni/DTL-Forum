import { useState, useEffect } from 'react';
import '../App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import AnnouncementsAdmin from './AnnouncementsAdmin';
import AdminHome from './AdminHome';
import PostAnnouncement from './PostAnnouncement';
import UserInfo from './UserInfo';
import { CircularProgress } from '@mui/material';
import ViewStatistics from './ViewStatistics'

function MainLoggedInAdmin() {
    document.title = 'mainLoggedIn-Admin - Interax';
    const [updatePage, setUpdatePage] = useState(false);

    if (localStorage.getItem("isAuthAdmin") === null) {
        localStorage.setItem("isAuthAdmin", false);
    }
    useEffect(() => {
        fetch('https://dtlforum-backend.vercel.app/isUserAuthAdmin', {
            method: "GET",
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === false) {
                    toast.error('Login required', { autoClose: 4000 });
                    localStorage.setItem("isAuth", false);
                    localStorage.setItem("isAuthAdmin", false);
                    window.location.replace('https://interax.netlify.app/AdminLogin');
                }
                else {
                    localStorage.setItem("isAuth", false);
                    localStorage.setItem("isAuthAdmin", true);
                    setUpdatePage(!updatePage);
                }
            })
            .catch(err => {
                console.log("Error connecting to server");
                toast.error("Error connecting to server", { autoClose: 4000 });
            })
    }, [updatePage]);

    return (
        <div className="App">
            {!(JSON.parse(localStorage.getItem("isAuthAdmin"))) ?
                <div className='loadingAuthCheck'>
                    <div>
                        <div className='centerText'>
                            Checking Authentication...
                        </div>
                        <div className="centerText">
                            <CircularProgress sx={{ margin: '0 auto' }} />
                        </div>
                    </div>
                </div>
                :
                <Router>
                    <Switch>
                        <Route exact path='/mainLoggedInAdmin/announcements'>
                            <AnnouncementsAdmin></AnnouncementsAdmin>
                        </Route>
                        <Route exact path='/mainLoggedInAdmin/home'>
                            <AdminHome></AdminHome>
                        </Route>
                        <Route exact path='/mainLoggedInAdmin/postAnnouncement'>
                            <PostAnnouncement></PostAnnouncement>
                        </Route>
                        <Route exact path='/mainLoggedInAdmin/viewstatistics'>
                            <ViewStatistics></ViewStatistics>
                        </Route>
                        <Route exact path='/mainLoggedInAdmin/userInfo'>
                            <UserInfo isAdmin={true}></UserInfo>
                        </Route>
                    </Switch>
                </Router>
            }
        </div>
    );
}

export default MainLoggedInAdmin;
