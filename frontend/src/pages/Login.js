import React, { useState } from 'react'
import { TextField, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import '../index.css'
import LinearProgress from '@mui/material/LinearProgress';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const login = () => {
        setIsLoading(true);
        fetch('http://localhost:5000/login', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        })
            .then(res => res.json())
            .then(data => {
                setIsLoading(false);
                if (data.success === true) {
                    toast.success(data.msg, { autoClose: 4000 });
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("username", data.user.username);
                    localStorage.setItem("email", data.user.email);
                    localStorage.setItem("year", data.user.year);
                    localStorage.setItem("userId", data.user.userId);
                    window.location.replace('http://localhost:3000/mainLoggedIn/forum'); // Perform apt redirection
                }
                else {
                    toast.error(data.msg, { autoClose: 4000 });
                }
                //localStorage.setItem("token", data.token);
            })
            .catch(err => {
                setIsLoading(false);
                console.log("Error connecting to server");
                toast.error("Error connecting to server", { autoClose: 4000 });
            })
    }

    const checkAuth = () => {
        fetch('http://localhost:5000/isUserAuth', {
            method: "GET",
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("isAuthuser ", data);
            })
    }


    return (
        <>
            <ToastContainer autoClose={4000} hideProgressBar={true} limit={1} closeButton={true} position={'top-right'}></ToastContainer>
            <div className='linearProgressContainer'>
                {isLoading && <LinearProgress></LinearProgress>}
            </div>
            <div className='loginContainer'>
                <div className='loginForm'>
                    <h4 className='centerText'>Login</h4>
                    <TextField size='small' sx={{ margin: '0.5em' }} value={username} label='Username' onChange={(e) => setUsername(e.target.value)}></TextField>
                    <TextField size='small' type='password' sx={{ margin: '0.5em' }} value={password} label='Password' onChange={(e) => setPassword(e.target.value)}></TextField>
                    <div className='buttonWrapper'>
                        <button className='button'><p className='centerText buttonText' onClick={login}>LOGIN</p></button>
                    </div>
                </div>
            </div >
        </>
    )
}


export default Login;
