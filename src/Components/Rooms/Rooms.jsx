import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import './Rooms.css';
import Div100vh from '../Div100vh/Div100vh';
import CreateChat from '../CreateChat/CreateChat';
import PersonIcon from '@material-ui/icons/Person';
import TelegramIcon from '@material-ui/icons/Telegram';
import axios from '../../axios';
import { io } from 'socket.io-client';
import Chat from '../Chat/Chat';

function Rooms() {

  const [{ user }, dispatch] = useStateValue();
  const objectUser = JSON.parse(user);
  const [chat, setChat] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const params = useParams();
  const socket = useRef();

  const logOut = () => {
    dispatch({
      type: "LOGOUT",
    });
  }

  useEffect(() => {
    let mounted = true;
    axios.get('/chat/list', {
      headers: {
        authorization: `Bearer ${objectUser.token}`
      }
    })
    .then(res => {
      mounted && setChat(res.data);
    })
    .catch(error => console.error(error.message));
    
    socket.current = io("https://reactchat-api.herokuapp.com/");
    socket.current?.emit('logged', { user_id: objectUser.id });
    socket.current?.on('getChats', (chat) => {
      mounted && setChat((prev) => [...prev, chat])
    })

    return () => {
      socket.current.close();
      mounted = false;
    }
  }, [])

  useEffect(() => {
    if (params.id) (setIsChatOpen(true))
    if (!params.id) (setIsChatOpen(false))
  }, [params])

  return(
    <Div100vh className={isChatOpen ? "rooms  rooms__chat" : "rooms"}>

      <CreateChat 
        isModalOpen={isModalOpen} 
        setIsModalOpen={setIsModalOpen} 
        socketRooms={socket} 
        setIsChatOpen={setIsChatOpen}
      />
      
      <div className={isChatOpen ? "rooms__container  rooms__containerChat" : "rooms__container"}>

        <div className={isChatOpen ? "sidebar  sidebar__chat" : "sidebar"}>

          <div className="sidebar__header">
            <PersonIcon />
            <h2>{objectUser.username}</h2>
            <Link to='/' onClick={logOut}>Log out</Link>
          </div>

          <div className="sidebar__createChat">
            <button onClick={() => setIsModalOpen(true)}>Create chat</button>
          </div>

          <div className="sidebar__chats">
            {chat && 
              chat.map((i) => {
                return (
                  <Link to={`/chat/${i._id}`} onClick={() => setIsChatOpen(true)}>
                    <div className="sidebar__chatsItem" key={i._id}>
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

        {params.id
        ?
        <Chat isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen}/>
        :
        <div className="rooms__noChat">
          <div className="rooms__logoContainer">
            <TelegramIcon />
            <p>React<br/>Chat</p>
          </div>
          <span>Open a chat or create one</span>
        </div>
        }       

      </div>
    </Div100vh>
  )
}

export default Rooms;