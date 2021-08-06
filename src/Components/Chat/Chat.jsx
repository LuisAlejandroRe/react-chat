import React, { useState, useEffect, useRef } from 'react';
import { useStateValue } from '../../StateProvider';
import { Link, useParams } from 'react-router-dom';
import './Chat.css';
import { IconButton } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SendIcon from '@material-ui/icons/Send';
import axios from '../../axios';
import { io } from 'socket.io-client';

function Chat() {
  const [{ user }] = useStateValue();
  const objectUser = JSON.parse(user);
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socket = useRef();
  const params = useParams();

  useEffect(() => {
    if(params.id) {
      let mounted = true;
      socket.current = io("ws://localhost:8000");
      socket.current?.on('getMessage', (msg) => {
        if(msg.chatId === params.id) {
          mounted && setMessages((prev) => [...prev, msg])
        }
      })
  
      return () => {
        socket.current.close();
        mounted = false;
      }
    }
  }, [params]);

  useEffect(() => {
    if(params.id) {
      let mounted = true;
      axios.get(`/chat/name/${params.id}`, {
        headers: {
          authorization: `Bearer ${objectUser.token}`
        },
      })
      .then((res) => {
        mounted && setChat(res.data);
      })
      .catch(error => alert(error.message));

      return () => {
        mounted = false;
        setChat(null);
      }
    }

  }, [params, user]);

  useEffect(() => {
    if(params.id) {
      let mounted = true;
      axios.get(`/messages/sync/${params.id}`, {
        headers: {
          authorization: `Bearer ${objectUser.token}`
        },
      })
      .then((res) => {
        mounted && setMessages(res.data);
      })
      .catch(error => alert(error.message));

      return () => {
        mounted = false;
        setMessages([]);
      }
    }
  }, [params, user]);

  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth'});
  },[messages]);

  const sendMessage = (e) => {
    e.preventDefault();

    const newInput = input.trim();

    if(newInput.length > 0) {

      socket.current?.emit('sendMessage', {
        senderId: {
          _id: objectUser.id,
          username: objectUser.username,
        },
        chatId: params.id,
        message: newInput,
        timestamp: new Date().toString(),
      })

      axios.post('/messages/new', {
        chatId: params.id,
        message: newInput,
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

  const onChange = (e) => {
    if (e.target.value.length >= 0 && e.target.value.length < 2000) {
      setInput(e.target.value)
    }
  }

  return(
    <div className="chat">
      <div className="chat__header">
        
        <Link to='/rooms'>
          <IconButton>
            <ArrowBackIosIcon />
          </IconButton>
        </Link>  

        <div className="chat__headerInfo">
          <GroupIcon />
          {chat &&
            chat.accessList.map((name) => {
              if(name._id !== objectUser.id) return (<h3>{name.username}</h3>)
            })
          }

        </div>

      </div>

      <div className="chat__body">
        {messages &&
          messages.map((message) => (
            <div className={`chat__reciever ${message.senderId._id === objectUser.id && "chat__message"}`}>         
              <span className="chat__name">{message.senderId.username}</span>
              <div className={`chat__containerReciever ${message.senderId._id === objectUser.id && "chat__container"}`}>           
                {message.message}
                <span className="chat__timestamp">{message.timestamp.split("GMT")[0]}</span>
              </div>
            </div>
          ))
        }
        <div ref={divRef}></div>
      </div>

      <div className="chat__footer">
        <form>
          <input 
            value={input} 
            onChange={onChange} 
            type="text" 
            placeholder="Type a message"
          />
          <IconButton onClick={sendMessage} type="submit" color='inherit'><SendIcon /></IconButton>
        </form>
      </div>
    </div>
  )
}

export default Chat;