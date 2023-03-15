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
import ReactMarkdown from "react-markdown";
import ForumIcon from '@mui/icons-material/Forum';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';

const styles = {
    resize: {
        fontSize: '10px'
    }
}


const PostForum = () => {
    document.title = 'Post Forum - Interax';
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [category, setCategory] = useState('1st Cat');
    const [checked, setChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [previewOption, setPreviewOption] = useState('html');
    const [showPreview, setShowPreview] = useState("previewContainer2");
    const [showDrawer, setShowDrawer] = useState(true);

    const postForumHandler = () => {

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
        fetch('https://dtlforum-backend.vercel.app/postForum', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title: title, body: body, category: category, username: localStorage.getItem('username'), email: localStorage.getItem('email'), year: localStorage.getItem('year'), userId: localStorage.getItem('userId'), anonymous: checked })
        })
            .then(res => res.json())
            .then(data => {
                setIsLoading(false);
                if (data.success === false) {
                    toast.error(data.msg, { autoClose: 4000 });
                }
                else {
                    toast.success(data.msg, { autoClose: 4000 });
                    window.location.replace('https://interax.netlify.app/mainLoggedIn/forum');
                }
            })
            .catch(err => {
                setIsLoading(false);
                console.log("Error connecting to server");
                toast.error("Error connecting to server", { autoClose: 4000 });
            })
    }
    console.log("preview ", showPreview);

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
        <div className='userBarContainer'>
            <NavbarForum />
            <button style={{ margin: '0.4em', width: '3em' }} className='button' onClick={() => { Logout() }}><LogoutIcon sx={{ margin: '-0.35em' }} /></button>
            <Link to='/mainLoggedIn/userInfo' style={{ textDecoration: 'none', color: '#82009c' }}>
                <div className='loggedInAsTextContainer' style={{ display: 'inline', float: 'right' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <AccountCircleIcon sx={{ margin: '0.075em 0' }} /><p className='loggedInAsText'>{localStorage.getItem('username')}</p>
                    </div>
                </div>
            </Link>
            <button className='menuButton' onClick={() => setShowDrawer(!showDrawer)}>MENU</button>
        </div>
        <Grid container >
            <Grid item md={2.2} sm={0} sx={{ display: showDrawer ? 'inline' : 'none' }} >
                <div className="drawerListWrapper">
                    <ul className="drawerLinks">
                        <li className="drawerLink"><Link to='/mainLoggedIn/forum' style={{ textDecoration: 'none', color: `${document.title.split('-')[0] === "Forum " ? "black" : "#82009c"}` }}><div className="link">{document.title.split('-')[0] === "Forum " ? <span>➔</span> : <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}<ForumIcon sx={{ margin: '-0.2em 0.2em' }} />Forum</div></Link></li>
                        <li className="drawerLink"><Link to='/mainLoggedIn/announcements' style={{ textDecoration: 'none', color: `${document.title.split('-')[0] === "Announcements " ? "black" : "#82009c"}` }}><div className="link">{document.title.split('-')[0] === "Announcements " ? <span>➔</span> : <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}<AnnouncementIcon sx={{ margin: '-0.2em 0.2em' }} />Announcements</div></Link></li>
                        <li className="drawerLink"><Link to='/mainLoggedIn/postForum' style={{ textDecoration: 'none', color: `${document.title.split('-')[0] === "Post Forum " ? "black" : "#82009c"}` }}><div className="link">{document.title.split('-')[0] === "Post Forum " ? <span>➔</span> : <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}<PostAddIcon sx={{ margin: '-0.2em 0.2em' }} />Post</div></Link></li>
                        <li className="drawerLink"><Link to='/mainLoggedIn/yourPosts' style={{ textDecoration: 'none', color: `${document.title.split('-')[0] === "Your Posts " ? "black" : "#82009c"}` }}><div className="link">{document.title.split('-')[0] === "Your Posts " ? <span>➔</span> : <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}<AccountBoxIcon sx={{ margin: '-0.2em 0.2em' }} />Your Posts</div></Link></li>
                        <li className="drawerLink"><Link to='/mainLoggedIn/topPosts' style={{ textDecoration: 'none', color: `${document.title.split('-')[0] === "Top Posts " ? "black" : "#82009c"}` }}><div className="link">{document.title.split('-')[0] === "Top Posts " ? <span>➔</span> : <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}<LocalFireDepartmentIcon sx={{ margin: '-0.2em 0.2em' }} />Top Posts</div></Link></li>
                        <li className="drawerLink"><Link to='/mainLoggedIn/userInfo' style={{ textDecoration: 'none', color: `${document.title.split('-')[0] === "User Info " ? "black" : "#82009c"}` }}><div className="link">{document.title.split('-')[0] === "User Info " ? <span>➔</span> : <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}<DisplaySettingsIcon sx={{ margin: '-0.2em 0.2em' }} />User Info</div></Link></li>
                    </ul>
                </div>
            </Grid>
            <Grid item md={showDrawer ? 9.8 : 12} sm={12}>
                <div className='forumWrapper'>
                    <div className='pageHeading'>Post</div>
                    <div className='postsWrapper' style={{ backgroundColor: 'rgb(242, 242, 255)' }} >
                        <p style={{ 'padding': '0 0.6em' }}><i><b> Note:</b> For html/markdown posts, add <b>.html/.md</b> at the end of the title</i></p>
                        <TextField variant='outlined' size='small' sx={{ margin: '0.5em' }} label='Title' value={title} onChange={(e) => { setTitle(e.target.value) }}></TextField>
                        <TextField multiline minRows={8} maxRows={8} variant='outlined' size='small' sx={{ margin: '0.5em' }} inputProps={{ style: { fontSize: '0.96rem' } }} label='Body' value={body} onChange={(e) => { setBody(e.target.value) }}></TextField>
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
                        <Select size='small' sx={{ margin: '0.5em', minWidth: "15em", alignSelf: 'center' }} value={category} onChange={(e) => setCategory(e.target.value)} >
                            <MenuItem value={'1st Cat'}>Academics</MenuItem>
                            <MenuItem value={'2nd Cat'}>Placements/Internships</MenuItem>
                            <MenuItem value={'3rd Cat'}>Miscellaneous</MenuItem>
                        </Select>
                        <div className='anonymousCheckboxWrapper'>
                            <p className='stayAnonymousText'>Stay anonymous: </p>
                            <Checkbox sx={{ margin: '1em' }} onChange={() => setChecked(!checked)} size='small' ></Checkbox>
                        </div>
                        <div className='buttonWrapper'>
                            <button className='button' style={{ margin: '0em' }} onClick={postForumHandler}><p className='centerText buttonText' >POST</p></button>
                        </div>

                    </div>
                </div>
            </Grid>
        </Grid>
    </>
}

export default PostForum;