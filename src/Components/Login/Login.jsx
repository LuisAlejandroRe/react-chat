import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import Div100vh from "../Div100vh/Div100vh";
import axios from '../../axios';
import './Login.css';
import TelegramIcon from '@material-ui/icons/Telegram';
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import githubLogo from '../../Media/github-logo.png';
import Loading from "../Loading/Loading";

function Login() {

  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const [{}, dispatch] = useStateValue();

  const onChange = (e) => {
    if (/^[a-zA-Z0-9\_\-]{0,40}$/.test(e.target.value)) {
      setUsername(e.target.value)
      setErrMessage(null);
    } else {
      setErrMessage('Username can have letters, numbers, hypen and underscore')
    }
  }

  const signIn = (e) => {
    e.preventDefault();

    if(username.length === 0) (setErrMessage('Please enter a username'));

    if(password.length < 8) (setErrMessage('Password must have at least 8 characters'))

    if(username.length > 0 && password.length >= 8 && password.length < 40) {
      setIsLoading(true);
      axios.post('/user/login', {
        username: username,
        password: password,
      })
      .then((res) => {
        const authUser = res.data.user
        if (authUser){
          dispatch({
            type: "SET_USER",
            user: JSON.stringify(authUser),
          });
          setIsLoading(false);
          history.push('/rooms');
        } else {
          setIsLoading(false);
          setErrMessage(res.data);
        }  
      })
      .catch(error => {
        alert(error.message);
        setIsLoading(false);
      });
    }
    
  }

  const register = e => {
    e.preventDefault();

    if(username.length === 0) (setErrMessage('Please enter a username'));

    if(password.length < 8) (setErrMessage('Password must have at least 8 characters'))

    if(username.length > 0 && password.length >= 8 && password.length < 40) {
      setIsLoading(true);
      axios.post('/user/register', {
        username: username,
        password: password,
      })
      .then(res => {
        const authUser = res.data.user
        if (authUser){
          dispatch({
            type: "SET_USER",
            user: JSON.stringify(authUser),
          });
          setIsLoading(false);
          history.push('/rooms');
        } else {
          setIsLoading(false);
          setErrMessage(res.data);
        }  
      })
      .catch(error => {
        alert(error.message);
        setIsLoading(false);
      });
    }

  }

  return (
    <Div100vh className="login">

      {isLoading &&
        <Loading />
      }   

      <div className="login__body">
        <div className="login__logoContainer">
          <TelegramIcon />
          <p>React<br/>Chat</p>
        </div>

        <div className="login__container">
          <h1>Sign-in</h1>

          {errMessage && <span>{errMessage}</span>}

          <form action="">
            <PersonIcon />
            <input 
              placeholder="username" 
              type="text" 
              value={username} 
              onChange={onChange}
            />

            <VpnKeyIcon />
            <input 
              placeholder="password" 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
            />

            <button type="submit" onClick={signIn} className="login__signInButton">Sign In</button>
          </form>

          <button onClick={register} className="login__registerButton">Create your Account</button>
        </div>
      </div>

      <div className="login__footer">
        <span>Made by Luis Alejandro Realpe</span>
        <a href="https://github.com/LuisAlejandroRe/hardware-shop" target='blank'>
          <img src={githubLogo} height='20'/>
          Repository
        </a>
      </div>
 
    </Div100vh>
  )
}

export default Login;