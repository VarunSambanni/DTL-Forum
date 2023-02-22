import { useState, useEffect } from 'react';
import '../App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Forum from './Forum';
import PostForum from './PostForum';
import { ToastContainer, toast } from 'react-toastify';
import YourPosts from './YourPosts';
import TopPosts from './TopPosts';
import UserInfo from './UserInfo';
import Announcements from './Announcements';
import { CircularProgress } from '@mui/material';

function MainLoggedIn() {
    document.title = 'mainLoggedIn - Interax';
    const [updatePage, setUpdatePage] = useState(false);
    if (localStorage.getItem("isAuth") === null) {
        localStorage.setItem("isAuth", false);
    }
    if (localStorage.getItem("isAuthAdmin") === null) {
        localStorage.setItem("isAuthAdmin", false);
    }
    useEffect(() => {
        fetch('https://dtlforum-backend.vercel.app/isUserAuth', {
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
                    window.location.replace('https://interax.netlify.app/login');
                }
                else {
                    localStorage.setItem("isAuth", true);
                    localStorage.setItem("isAuthAdmin", false);
                    setUpdatePage(!updatePage);
                }
            })
            .catch(err => {
                console.log("Error connecting to server from mainLoggedIn");
                toast.error("Error connecting to server", { autoClose: 4000 });
            })
    }, [updatePage]);

    return (
        <div className="App">
            {!(JSON.parse(localStorage.getItem("isAuth"))) ?
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
                        <Route exact path='/mainLoggedIn/announcements'>
                            <Announcements></Announcements>
                        </Route>
                        <Route exact path='/mainLoggedIn/forum'>
                            <Forum></Forum>
                        </Route>
                        <Route exact path='/mainLoggedIn/postForum'>
                            <PostForum></PostForum>
                        </Route>
                        <Route exact path='/mainLoggedIn/yourPosts'>
                            <YourPosts></YourPosts>
                        </Route>
                        <Route exact path='/mainLoggedIn/topPosts'>
                            <TopPosts></TopPosts>
                        </Route>
                        <Route exact path='/mainLoggedIn/userInfo'>
                            <UserInfo isAdmin={false}></UserInfo>
                        </Route>
                    </Switch>
                </Router>
            }
        </div>
    );
}

export default MainLoggedIn;
