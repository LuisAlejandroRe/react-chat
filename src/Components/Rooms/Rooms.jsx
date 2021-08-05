import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import './Rooms.css';
import CreateChat from '../CreateChat/CreateChat';
import { Avatar, IconButton } from '@material-ui/core';
import axios from '../../axios';

function Rooms() {

  const [{ user, isCreateChatOpen }, dispatch] = useStateValue();
  const objectUser = JSON.parse(user);
  const [chat, setChat] = useState([]);

  const logOut = () => {
    dispatch({
      type: "LOGOUT",
    });
  }

  const openModal = () => {
    dispatch({
      type: "OPEN_CREATECHAT",
    });
  }

  useEffect(() => {
    axios.get('/chat/list', {
      headers: {
        authorization: `Bearer ${objectUser.token}`
      }
    })
    .then(res => {
      setChat(res.data);
    })
    .catch(error => alert(error.message))
  }, [])

  return(
    <div className="rooms" >
      <div className="rooms__header">
        <Avatar/>
        <h2>{objectUser.username}</h2>
        <Link to='/' onClick={logOut}>Log out</Link>
      </div>

      <div className="rooms__createChat">
        <button onClick={openModal}>Create chat</button>
      </div>

      {isCreateChatOpen &&
        <CreateChat />
      }

      <div className="rooms__chats">
        {chat && 
          chat.map((i) => {
            return (
              <Link to={`/chat/${i._id}`}>
                <div className="rooms__chatsItem" key={i._id}>
                  {i.accessList.map((name) => {
                    if(name._id !== objectUser.id) return (<p>{name.username}</p>)
                  })}
                </div>
              </Link>
            )
          })
        }
      </div>
 
    </div>
  )
}

export default Rooms;