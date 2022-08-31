import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import '../index.css'
import NavbarForum from '../components/NavbarForum';
import { TextField, Button, Grid } from '@mui/material';
import Logout from '../utils/Logout';
import LogoutIcon from '@mui/icons-material/Logout';
import LinearProgress from '@mui/material/LinearProgress';
import { Scale } from '@mui/icons-material';


const UserInfo = () => {
    document.title = 'User Info - Interax';

    return (
        <>
            <ToastContainer autoClose={4000} hideProgressBar={true} limit={1} closeButton={true} position={'top-right'}></ToastContainer>
            <div className='linearProgressContainer'>

            </div>
            <div className='forumWrapper' >
                <Grid container>
                    <Grid item md={5.2} xs={12}>
                        <NavbarForum />
                        <button style={{ margin: '0.4em', width: '3em' }} className='button' onClick={() => { Logout() }}><LogoutIcon sx={{ margin: '-0.35em' }} /></button>
                    </Grid>
                    <Grid item md={6.8} xs={12}>
                        <div className='headingWrapper'>
                            <h1 className='centerText heading' ></h1>
                        </div>
                    </Grid>
                </Grid>
                <hr />
                <div className='postsWrapper' style={{
                    padding: '0em', margin: '0em',
                }} >
                    <div className='loginContainer' style={{ padding: '1em', fontSize: '0.85rem', margin: '1em auto' }} >
                        <div className='loginForm'>
                            <h4 className='centerText'>User Info</h4>
                            <div className='userInfoText' style={{ display: 'flex', flexDirection: 'row' }}>
                                <h4 style={{ margin: '0.2em', padding: '0em' }}>Username: </h4>
                                <h4 style={{ margin: '0.2em', padding: '0em', fontWeight: '100' }}>{localStorage.getItem('username')}</h4>
                            </div>
                            <div className='userInfoText' style={{ display: 'flex', flexDirection: 'row' }}>
                                <h4 style={{ margin: '0.2em', padding: '0em' }}>Email: </h4>
                                <h4 style={{ margin: '0.2em', padding: '0em', fontWeight: '100' }}>{localStorage.getItem('email')}</h4>
                            </div>
                            <div className='userInfoText' style={{ display: 'flex', flexDirection: 'row' }}>
                                <h4 style={{ margin: '0.2em', padding: '0em' }}>Year: </h4>
                                <h4 style={{ margin: '0.2em', padding: '0em', fontWeight: '100' }}>{localStorage.getItem('year')}</h4>
                            </div>
                        </div>
                    </div >
                </div>
            </div>
        </>
    )
}


export default UserInfo;
