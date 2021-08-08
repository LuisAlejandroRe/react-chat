import React, { useState, useEffect, useRef }from 'react';
import { useHistory } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import { useStateValue } from '../../StateProvider';
import './CreateChat.css';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import axios from '../../axios';

function CreateChat({isModalOpen, setIsModalOpen, socketRooms}) {

  const history = useHistory();
  const [{ user }] = useStateValue();
  const objectUser = JSON.parse(user);
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);
  const [addList, setAddList] = useState([]);
  //const socket = useRef();

  /*useEffect(() => {
    socket.current = io("ws://localhost:8000");
  
    return () => {
      socket.current.close();
    }
    
  }, []);*/

  const handleSearch = e => {
    e.preventDefault();

    axios.post('/user/list', {
      search: search,
    },{
      headers: {
        authorization: `Bearer ${objectUser.token}`
      },
    })
    .then(res => {
      setResult(res.data);
    })
    .catch(error => alert(error.message))
  }

  const addToList = (item) => {
    const list = [...addList, item];
    const newList = [...new Set(list)];
    setAddList(newList)
  }

  const removeOfList = (item) => {
    const newList = addList.filter((user) => user._id !== item._id)
    setAddList(newList)
  }

  const createChat = () => {
    if(addList.length > 0) {
      const accessIds = addList.map((user) => user._id );
      axios.post('/chat/create', {
        accessList: accessIds,
      },{
        headers: {
          authorization: `Bearer ${objectUser.token}`
        },
      })
      .then(res => {   
        const param = res.data;
        socketRooms.current?.emit('newChat', {
          accessList: addList,
          creatorInfo: { 
            _id: objectUser.id, 
            username: objectUser.username, 
          },
          _id: param,
        });
        setSearch('');
        setResult([]);
        setAddList([]);
        setIsModalOpen(false);
        history.push(`/chat/${param}`);
      })
      .catch(error => alert(error))
    }
  }

  return (
    <>
      {isModalOpen &&
        <div className="createchat">
          <div className="createchat__search">

            <CloseIcon onClick={() => setIsModalOpen(false)}/>
            
            <h2>New Chat</h2>
            <form action=""> 
              <input 
                type="text" 
                placeholder="Search by unique username" 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
              />
              <button type="submit" onClick={handleSearch}><SearchIcon /></button>
            </form>
            
            <div className="createchat__searchButtons">
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button onClick={() => createChat()}>Create</button>
            </div>

            <div className="createsearch__lists">
              <div>
                {result &&
                  result.map(item => {
                    if(item){
                      return (
                        <div className="createchat__result" key={item._id}>
                          <PersonIcon/>
                          <h3>{item.username}</h3>
                          <IconButton onClick={() => addToList(item)}>
                            <AddCircleIcon />
                          </IconButton>
                        </div>
                      )
                    }    
                  })
                }
              </div>
              <div>
                {addList && 
                  addList.map(item => {
                    if(item){
                      return (
                        <div className="createchat__result" key={item._id}>
                          <PersonIcon/>
                          <h3>{item.username}</h3>
                          <IconButton onClick={() => removeOfList(item)}>
                            <RemoveCircleIcon />
                          </IconButton>
                        </div>
                      )
                    }    
                  })
                }
              </div>
            </div>
            
          </div>
        </div>
      }
    </>
  )
}

export default CreateChat
