import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import LinearProgress from "@mui/material/LinearProgress";
import Linkify from 'react-linkify';

const ModalComponent = ({ isModalOpen, setIsModalOpen, title, body, answerBody, setAnswerBody, id, postId, category }) => {
    const [isLoading, setIsLoading] = useState(false);

    const postHandler = () => {
        if (answerBody === "") {
            toast.error('Answer body cannot be empty', { autoClose: 4000 });
            return;
        }

        setIsLoading(true);
        fetch('http://localhost:5000/answer', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ username: localStorage.getItem('username'), email: localStorage.getItem('email'), userId: localStorage.getItem('userId'), year: localStorage.getItem('year'), category: category, id: id, postId: postId, answer: answerBody })
        })
            .then(res => res.json())
            .then(data => {
                setIsLoading(false);
                if (data.success === false) {
                    toast.error(data.msg, { autoClose: 4000 });
                }
                else {
                    toast.success(data.msg, { autoClose: 4000 });
                    window.location.replace('http://localhost:3000/mainLoggedIn/forum');
                }
            })
            .catch(err => {
                setIsLoading(false);
                console.log("Error connecting to server");
                toast.error("Error connecting to server", { autoClose: 4000 });
            })
    }

    return <Modal isOpen={isModalOpen} contentLabel='Reply post'>
        <div className='linearProgressContainer'>
            {isLoading && <LinearProgress></LinearProgress>}
        </div>
        <div className='modalCloseButtonWrapper'>
            <button className='button' style={{ margin: '0.2em' }} ><p className='centerText buttonText' onClick={() => setIsModalOpen(false)}>CLOSE</p></button>
        </div>
        <div className='titleWrapper'>
            <h4 className="title">{title}</h4>
        </div>
        <div className='bodyWrapper'>
            <Linkify>
                <pre>
                    {body}
                </pre>
            </Linkify>
        </div>
        <div className="modalAnswerWrapper">
            <TextField multiline minRows={5} maxRows={5} variant='outlined' size='small' sx={{ margin: '0.5em' }} label='Body' value={answerBody} onChange={(e) => setAnswerBody(e.target.value)}></TextField>
        </div>
        <div className="modalPostButtonWrapper">
            <button className='button' style={{ margin: '0em' }} ><p className='centerText buttonText' onClick={postHandler}>POST</p></button>
        </div>
    </Modal >
}

export default ModalComponent