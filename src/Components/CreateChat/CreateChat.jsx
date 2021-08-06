import React, { useState }from 'react';
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

function CreateChat({isModalOpen, setIsModalOpen}) {

  const history = useHistory();
  const [{ user }] = useStateValue();
  const objectUser = JSON.parse(user);
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);
  const [addList, setAddList] = useState([]);

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
      axios.post('/chat/create', {
        accessList: addList,
      },{
        headers: {
          authorization: `Bearer ${objectUser.token}`
        },
      })
      .then(res => {
        setSearch('');
        setResult([]);
        setAddList([]);
        const param = res.data;
        history.push(`/chat/${param}`);
        setIsModalOpen(false);
      })
      .catch(error => alert(error.message))
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
                          <IconButton>
                            <AddCircleIcon onClick={() => addToList(item)}/>
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
                          <IconButton>
                            <RemoveCircleIcon onClick={() => removeOfList(item)}/>
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
