import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Button, TextField } from "@mui/material";
import Modal from 'react-modal';
import ModalComponent from "./ModalComponent";
import { ToastContainer, toast } from 'react-toastify';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useEffect } from "react";
import Linkify from 'react-linkify'

const findUserId = (upvotes, userId) => {
    for (let i = 0; i < upvotes.length; i++) {
        if (upvotes[i] === userId) {
            return i;
        }
    }
    return -1;
}

const Post = ({ title, body, username, email, answers, id, year, postId, category, yourPostsFlag, upvotes, time, forumUpdate, setForumUpdate }) => {
    console.log(year);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [answerBody, setAnswerBody] = useState('');
    const [postUpdate, setPostUpdate] = useState(false);
    let temp = "";
    const postUpvote = () => {
        console.log("Post upvote ");
        fetch('http://localhost:5000/upvote', {
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
                    //window.location.replace('http://localhost:3000/login'); // Check this
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

    /*
    const ModalComponent = () => {
        return <Modal isOpen={isModalOpen} contentLabel='Reply post'>
            <div className='modalCloseButtonWrapper'>
                <Button variant="outlined" onClick={() => setIsModalOpen(false)}>Close</Button>
            </div>
            <div className='bodyWrapper'>
                <pre>{body}</pre>
            </div>
            <div className="modalAnswerWrapper">
                <TextField multiline minRows={5} maxRows={5} variant='outlined' size='small' sx={{ margin: '0.5em' }} label='Body' value={answerBody} onChange={(e) => setAnswerBody(e.target.value)}></TextField>
            </div>
            <div className="modalPostButtonWrapper">
                <Button variant='outlined'>Post</Button>
            </div>
        </Modal >

        <Linkify>
                {body.split("").map((char) => {
                    if (char !== '\n') {
                        temp += char;
                    }
                    else {
                        let line = temp;
                        console.log("line", line);
                        temp = "";
                        return <pre>{line}<br></br></pre>
                    }
                })}
                <pre>{temp}</pre>
        </Linkify>
    }
    */
    return <>
        <Grid container>
            <Grid item xs={12}>
                <ModalComponent isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title={title} body={body} answerBody={answerBody} setAnswerBody={setAnswerBody} id={id} postId={postId} category={category} />
                <div className="postWrapper">
                    <div className='titleWrapper'>
                        <h4 className="title">{title}</h4>
                        <p className="time">{time}</p>
                        <hr />
                        {yourPostsFlag && <p className="askedInCat">Asked in {category === '1st Cat' ? 'Academics' : (category === '2nd Cat' ? 'Placements/Internships' : 'Miscellaneous')}</p>}
                    </div>
                    <div className='bodyWrapper'>
                        <Linkify>
                            <pre>
                                {body}
                            </pre>
                        </Linkify>
                    </div>
                    <div className="emailWrapper">
                        <p className="bold">Posted By: {username}{`(${year})`}{email !== 'Email' ? '-' + email : ''}</p>
                        <div className="answerButtonWrapper">
                            <button className={(findUserId(upvotes, localStorage.getItem('userId')) !== -1) ? 'upvotedButton' : 'button upvoteButton'} style={{ margin: '0 0.4em' }} onClick={postUpvote} >
                                <p className='centerText buttonText' >
                                    <ThumbUpOffAltIcon sx={{ marginTop: '-0.08em' }} />
                                </p>
                                <div>
                                    <p className="upvotesText">{upvotes.length}</p>
                                </div>
                            </button>
                            {!yourPostsFlag &&
                                <button className='button' style={{ margin: '0 0.4em' }}><p className='centerText buttonText' onClick={() => setIsModalOpen(true)}>REPLY</p></button>
                            }
                        </div>

                    </div>
                    {answers.length > 0 &&
                        <div className="answersWrapper">
                            {answers.map((answer, index) => {
                                console.log("answer => ", answer);
                                return <div key={index} className="answerWrapper">
                                    <p style={{ margin: '0em', padding: '0em' }}>
                                        <pre style={{ padding: '0em', margin: '0.2em' }}>
                                            <Linkify>{answer.answer}</Linkify>
                                        </pre>
                                    </p>
                                    <p className="bold">- {answer.username}</p>
                                    <hr />
                                </div>
                            })}
                        </div>
                    }
                </div>
            </Grid>
        </Grid>
    </>
}

export default Post;