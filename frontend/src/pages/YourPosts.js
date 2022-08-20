import React, { useEffect, useState } from 'react'
import { TextField, Button, Grid } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import Post from '../components/Post';
import NavbarForum from '../components/NavbarForum';
import '../index.css'
import LinearProgress from '@mui/material/LinearProgress';
import LogoutIcon from '@mui/icons-material/Logout';
import Logout from '../utils/Logout'

const YourPosts = () => {

    const [yourPosts, setYourPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:5000/yourPosts', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ username: localStorage.getItem('username'), email: localStorage.getItem('email'), userId: localStorage.getItem('userId'), year: localStorage.getItem('year') }) // CHANGE THIS 
        })
            .then(res => res.json())
            .then(data => {
                setIsLoading(false);
                if (data.success === false) {
                    toast.error(data.msg, { autoClose: 4000 });
                    //window.location.replace('http://localhost:3000/login');
                }
                setYourPosts(data.posts);
                console.log("your posts data ", data.posts);
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
            <Grid container>
                <Grid item md={5.2} xs={12}>
                    <NavbarForum />
                    <button style={{ margin: '0.4em', width: '3em' }} className='button' onClick={() => { Logout() }}><LogoutIcon sx={{ margin: '-0.35em' }} /></button>
                </Grid>
                <Grid item md={6.8} xs={12}>
                    <div className='headingWrapper'>
                    </div>
                </Grid>
            </Grid>
            <hr />
            <div className='postsWrapper'>
                {yourPosts.length === 0 && <p className='centerText' style={{ fontSize: '1.2rem' }}>No posts yet</p>}
                {
                    yourPosts.map((post, index) => {
                        return <Post key={index} title={post.title} year={post.year} body={post.body} username={post.username} email={post.email} answers={post.answers} postId={post.postId} id={post._id} category={post.category} yourPostsFlag={true} upvotes={post.upvotes} time={post.time} />
                    })
                }
            </div>
        </div>
    </>
}

export default YourPosts;   