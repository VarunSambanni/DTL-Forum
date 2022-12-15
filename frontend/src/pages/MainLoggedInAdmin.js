import { useState, useEffect } from 'react';
import '../App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import AnnouncementsAdmin from './AnnouncementsAdmin';
import AdminHome from './AdminHome';
import PostAnnouncement from './PostAnnouncement';
import UserInfo from './UserInfo';

function MainLoggedInAdmin() {
    document.title = 'mainLoggedIn-Admin - Interax';
    console.log("mainloggedInAdmin");
    useEffect(() => {
        fetch('http://localhost:5000/isUserAuthAdmin', {
            method: "GET",
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === false) {
                    toast.error('Login required', { autoClose: 4000 });
                    window.location.replace('https://interax.netlify.app/AdminLogin');
                }
            })
            .catch(err => {
                console.log("Error connecting to server");
                toast.error("Error connecting to server", { autoClose: 4000 });
            })
    }, []);

    return (
        <div className="App">
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
                    <Route exact path='/mainLoggedInAdmin/userInfo'>
                        <UserInfo isAdmin={true}></UserInfo>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default MainLoggedInAdmin;
