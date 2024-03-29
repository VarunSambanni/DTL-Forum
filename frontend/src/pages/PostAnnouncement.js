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
import ReactMarkdown from "react-markdown";


const PostAnnouncement = () => {
    document.title = 'Post Announcement-Admin - Interax';
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [previewOption, setPreviewOption] = useState('html');
    const [showPreview, setShowPreview] = useState("previewContainer2");

    const postAnnouncementHandler = () => {
        if (title.length < 5) {
            toast.error('Title must container 5 characters at least', { autoClose: 4000 });
            return;
        }

        if (body.length < 10) {
            toast.error('Body must container 10 characters at least', { autoClose: 4000 });
            return;
        }

        if (title.substring(title.length - 5) === '.html' && body.search("<style") !== -1 || body.search("<script") !== -1) {
            toast.error('style/script tags are not allowed while using html !', { autoClose: 4000 });
            return;
        }

        setIsLoading(true);
        fetch('https://dtlforum-backend.vercel.app/postAnnouncement', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title: title, body: body, username: localStorage.getItem('username'), email: localStorage.getItem('email'), userId: localStorage.getItem('userId') })
        })
            .then(res => res.json())
            .then(data => {
                setIsLoading(false);
                if (data.success === false) {
                    toast.error(data.msg, { autoClose: 4000 });
                }
                else {
                    toast.success(data.msg, { autoClose: 4000 });
                    window.location.replace('https://interax.netlify.app/mainLoggedInAdmin/announcements');
                }
            })
            .catch(err => {
                setIsLoading(false);
                console.log("Error connecting to server");
                toast.error("Error connecting to server", { autoClose: 4000 });
            })
    }

    const previewToggleHanlder = () => {
        if (showPreview === 'previewContainer') {
            setShowPreview('previewContainer2')
        }
        else {
            setShowPreview('previewContainer')
        }
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
            <div className='pageHeading'>Post Announcement</div>
            <div className='postsWrapper' style={{ backgroundColor: 'rgb(242, 242, 255)' }} >
                <p style={{ 'padding': '0 0.6em' }}><i><b> Note:</b> For html/markdown posts, add <b>.html/.md</b> at the end of the title</i></p>
                <TextField variant='outlined' size='small' sx={{ margin: '0.5em' }} label='Title' value={title} onChange={(e) => { setTitle(e.target.value) }}></TextField>
                <TextField multiline minRows={12} maxRows={12} variant='outlined' size='small' sx={{ margin: '0.5em' }} inputProps={{ style: { fontSize: '0.96rem' } }} label='Body' value={body} onChange={(e) => { setBody(e.target.value) }}></TextField>
                <div className={showPreview} >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button className='button' onClick={previewToggleHanlder}> PREVIEW</button>
                        <div>
                            Option :
                            <Select size='small' sx={{ margin: '0.5em', maxWidth: "8em", alignSelf: 'left' }} value={previewOption} onChange={(e) => setPreviewOption(e.target.value)} >
                                <MenuItem value={'html'}>HTML</MenuItem>
                                <MenuItem value={'md'}>Markdown</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <hr></hr>

                    {
                        previewOption === 'html' ? <pre style={{ maxHeight: '40em' }} dangerouslySetInnerHTML={{ __html: body }}></pre>
                            : <ReactMarkdown>{body}</ReactMarkdown>
                    }
                </div>
                <div className='buttonWrapper'>
                    <button className='button' style={{ margin: '4em' }} onClick={postAnnouncementHandler}><p className='centerText buttonText' >POST</p></button>
                </div>
            </div>
        </div>
    </>
}

export default PostAnnouncement;