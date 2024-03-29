import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import ModalComponent from "./ModalComponent";
import { ToastContainer, toast } from 'react-toastify';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import Linkify from 'react-linkify'
import ReactMarkdown from "react-markdown";
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GradeIcon from '@mui/icons-material/Grade';


const styles = {
    content: {
        height: 'fit-content',
        margin: 'auto',
        maxHeight: '70vh',
        overflow: 'auto',
        width: 'fit-content',
        position: 'fixed',
        left: '0.5em'
    }
}

const findUserId = (upvotes, username) => {
    for (let i = 0; i < upvotes.length; i++) {
        if (upvotes[i] === username) {
            return i;
        }
    }
    return -1;
}

const Post = ({ title, body, username, email, answers, id, year, postId, category, yourPostsFlag, upvotes, time, forumUpdate, setForumUpdate, yourPostsUpdate, setYourPostsUpdate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [answerBody, setAnswerBody] = useState('');
    const [postUpdate, setPostUpdate] = useState(false);
    const [userScore, setUserScore] = useState(0);
    const [isUserDetailsModalOpen, setIsUserDetailsModalOpen] = useState(false);

    const postUpvote = () => {
        fetch('https://dtlforum-backend.vercel.app/upvote', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ category: category, username: localStorage.getItem('username'), email: localStorage.getItem('email'), year: localStorage.getItem('year'), userId: localStorage.getItem('userId'), postId: postId }) // CHANGE THIS 
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === false) {
                    toast.error(data.msg, { autoClose: 4000 });
                }
                else {
                    if (data.msg === "Post upvoted") {
                        setForumUpdate(!forumUpdate);
                        setPostUpdate(!postUpdate);
                    }
                    toast.success(data.msg, { autoClose: 4000 });
                }
            })
    }

    const usernameClickHandler = () => {
        if (username === "Anonymous") {
            return;
        }
        setIsUserDetailsModalOpen(true);
        fetch('https://dtlforum-backend.vercel.app/getScore', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ username: username })
        })
            .then(res => res.json())
            .then(data => {
                console.log("data    ", data);
                if (data.success === true) {
                    setUserScore(data.score);
                }
            })
            .catch(err => {
                console.log("Error connecting to server");

            })
    }

    const deletePost = () => {
        fetch('https://dtlforum-backend.vercel.app/deletePost', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ category: category, username: localStorage.getItem('username'), email: localStorage.getItem('email'), year: localStorage.getItem('year'), userId: localStorage.getItem('userId'), postId: postId }) // CHANGE THIS 
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === false) {
                    toast.error(data.msg, { autoClose: 4000 });
                }
                else {
                    if (data.msg === "Post deleted") {
                        setYourPostsUpdate(!yourPostsUpdate);
                    }
                    toast.success(data.msg, { autoClose: 4000 });
                }
            })
    }



    return <>
        <Grid container>
            <Grid item xs={12}>
                <ModalComponent isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title={title} body={body} answerBody={answerBody} setAnswerBody={setAnswerBody} id={id} postId={postId} category={category} />
                <div className="postWrapper">
                    <div className='titleWrapper'>
                        <h4 className="title">{title.substring(title.length - 5) === '.html' ? title.substring(0, title.length - 5) : title.substring(title.length - 3) === '.md' ? title.substring(0, title.length - 3) : title}</h4>
                        <p className="time">{time}</p>
                        {yourPostsFlag && <p className="askedInCat">Posted in {category === '1st Cat' ? 'Academics' : (category === '2nd Cat' ? 'Placements/Internships' : 'Miscellaneous')}</p>}
                    </div>

                    <div className='bodyWrapper'>

                        {
                            title.substring(title.length - 5) === '.html' ?
                                <pre style={{ maxHeight: '40em' }} dangerouslySetInnerHTML={{ __html: body }}></pre>
                                :
                                title.substring(title.length - 3) === '.md' ? <div style={{ maxHeight: '40em' }}> <ReactMarkdown>{body}</ReactMarkdown> </div> : <Linkify> <pre style={{ maxHeight: '40em' }} >{body}</pre>  </Linkify>
                        }

                    </div>
                    <div className="emailWrapper">
                        <p className="bold usernameLink" onClick={usernameClickHandler}><AccountBoxIcon style={{ marginBottom: '-0.3em' }} />{username}</p>
                        <Modal style={styles} isOpen={isUserDetailsModalOpen}>
                            <div className='modalCloseButtonWrapper'>
                                <button className='button' style={{ margin: '0.8em 0.2em', width: 'fit-content', height: 'fit-content', padding: '0em', height: '2em' }} onClick={() => setIsUserDetailsModalOpen(false)} ><p className='centerText buttonText' ><CloseIcon fontSize="0.1em" sx={{ margin: '0.1em' }} /></p></button>
                            </div>
                            <div className="userDetailsContainer">
                                <div className='loginContainer' style={{ padding: '0.4em', fontSize: '0.95rem', margin: 'auto' }} >
                                    <div className='loginForm'>
                                        <h4 className='centerText'>User Info</h4>
                                        <div className='userInfoText' style={{ display: 'flex', flexDirection: 'row' }}>
                                            <h4 style={{ margin: '0.2em', padding: '0em' }}>Username: </h4>
                                            <h4 style={{ margin: '0.2em', padding: '0em', fontWeight: '100' }}>{username}</h4>
                                        </div>
                                        <div className='userInfoText' style={{ display: 'flex', flexDirection: 'row' }}>
                                            <h4 style={{ margin: '0.2em', padding: '0em' }}>Email: </h4>
                                            <h4 style={{ margin: '0.2em', padding: '0em', fontWeight: '100' }}>{email}</h4>
                                        </div>
                                        <div className='userInfoText' style={{ display: 'flex', flexDirection: 'row' }}>
                                            <h4 style={{ margin: '0.2em', padding: '0em' }}>Year: </h4>
                                            <h4 style={{ margin: '0.2em', padding: '0em', fontWeight: '100' }}>{year}</h4>
                                        </div>
                                        <div className='userInfoText' style={{ display: 'flex', flexDirection: 'row' }}>
                                            <h4 style={{ margin: '0.2em', padding: '0em' }}>User Score: </h4>
                                            <div style={{ display: 'flex' }}>
                                                <h4 style={{ margin: '0.2em', padding: '0em', fontWeight: '100' }}>{userScore > 0 ? userScore.toFixed(4) : 0}</h4>
                                                <GradeIcon sx={{ color: 'rgb(94, 3, 179);' }} />
                                            </div >
                                        </div>
                                    </div>
                                </div >
                            </div>
                        </Modal>
                        <div className="answerButtonWrapper">
                            <button onClick={postUpvote} className={(findUserId(upvotes, localStorage.getItem('username')) !== -1) ? 'upvotedButton' : 'button upvoteButton'} style={{ margin: '0 0.4em' }}>
                                <p className='centerText buttonText' >
                                    <ThumbUpOffAltIcon sx={{ marginTop: '-0.08em' }} />
                                </p>
                                <div>
                                    <p className="upvotesText">{upvotes.length}</p>
                                </div>
                            </button>
                            {yourPostsFlag ?
                                <button className='button upvoteButton' style={{ margin: '0 0.4em' }} onClick={() => deletePost()} ><p className='centerText buttonText' ><DeleteIcon sx={{ marginTop: '-0.08em' }} /></p></button>
                                :
                                <button className='button' style={{ margin: '0 0.4em', width: 'fit-content', padding: '0em 0.4em' }} onClick={() => setIsModalOpen(true)} ><p className='centerText buttonText' >REPLY</p></button>
                            }
                        </div>

                    </div>
                    {answers.length > 0 &&
                        <div className="answersWrapper">
                            {answers.map((answer, index) => {
                                return <div key={index} className="answerWrapper">
                                    <p style={{ margin: '0.1em', padding: '0.2em' }}>
                                        <p className="bold" style={{ display: "inline" }}>{answer.username} : </p>
                                        <pre style={{ display: "inline", padding: '0em', margin: '0.2em' }}>
                                            <Linkify>{answer.answer}</Linkify>
                                        </pre>
                                    </p>
                                    <hr />
                                </div>
                            })}
                        </div>
                    }
                </div>
            </Grid>
        </Grid >
    </>
}

export default Post;