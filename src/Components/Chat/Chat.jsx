import React, { useState, useEffect, useRef } from 'react';
import { useStateValue } from '../../StateProvider';
import { Link, useParams } from 'react-router-dom';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from '../../axios';
import { io } from 'socket.io-client';

function Chat() {
  const [{ user }] = useStateValue();
  const objectUser = JSON.parse(user);
  const [chat, setChat] = useState();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socket = useRef();
  const params = useParams();

  useEffect(() => {
    socket.current = io("ws://localhost:8000");
    socket.current?.on('getMessage', (msg) => {
      if(msg.chatId === params.id) {
        setMessages((prev) => [...prev, msg])
      }
    })

    return () => {
      socket.current.close();
    }

  }, [params]);

  useEffect(() => {
    axios.get(`/chat/name/${params.id}`, {
      headers: {
        authorization: `Bearer ${objectUser.token}`
      },
    })
    .then((res) => {
      setChat(res.data);
    })
    .catch(error => alert(error.message));
  }, [params, objectUser]);

  useEffect(() => {

    console.log('Ejecutando peticion get')

    axios.get(`/messages/sync/${params.id}`, {
      headers: {
        authorization: `Bearer ${objectUser.token}`
      },
    })
    .then((res) => {
      setMessages(res.data);
    })
    .catch(error => alert(error.message));
  }, []);

  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth'});
  },[messages]);

  const sendMessage = (e) => {
    e.preventDefault();

    if(input.length > 0) {

      socket.current?.emit('sendMessage', {
        senderId: {
          _id: objectUser.id,
          username: objectUser.username,
        },
        chatId: params.id,
        message: input,
        timestamp: new Date().toString(),
      })

      axios.post('/messages/new', {
        chatId: params.id,
        message: input,
        timestamp: new Date().toString(),
      },{
        headers: {
          authorization: `Bearer ${objectUser.token}`
        },
      })
      .then()
      .catch(error => alert(error.message))
      
      setInput('');
    }  
  };

  return(
    <div className="chat">
      <div className="chat__header">
        
        <Link to='/rooms'>
          <IconButton>
            <ArrowBackIosIcon />
          </IconButton>
        </Link>
        

        <Avatar />

        <div className="chat__headerInfo">
          {chat &&
            chat.accessList.map((name) => {
              if(name._id !== objectUser.id) return (<h3>{name.username}</h3>)
            })
          }
          <p>Last seen at...</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages &&
          messages.map((message) => (
            <p className={`chat__reciever ${message.senderId._id === objectUser.id && "chat__message"}`}>         
            <span className="chat__name">{message.senderId.username}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp.split("GMT")[0]}</span>
            </p>
          ))
        }
        <div ref={divRef}></div>
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            type="text" 
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}

export default Chat;