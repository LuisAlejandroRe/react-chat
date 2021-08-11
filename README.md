<!-- PROJECT LOGO -->
<br />
<p align="center">
  
  <a href="https://react-chat-67a93.web.app/" target="blank">
    <img src="https://firebasestorage.googleapis.com/v0/b/react-chat-67a93.appspot.com/o/logo192.jpg?alt=media&token=59f1f409-290d-4ab7-bbdc-c5a4acdd680f" alt="Logo" >
  </a>

  <h3 align="center">REACT CHAT</h3>

  <p align="center">
    Demo Chat App
	Made with React
    <br />
    <a href="https://react-chat-67a93.web.app/" target="blank">View Application</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
  	<li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#app-overview">Overview</a></li>
    <li><a href="#languages-and-tools">Languages and Tools</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

React Chat is a full-stack MERN web application that allows users to have real-time conversations in private chats with one or more people. The back end of the application was built with Node.js, Mongoose and MongoDB database. All data fetching was done using Express and Axios for declaring JSON structures. The front end was created with React.js using functional components with hooks.

#### Authentication

In authentication user password is encrypted using bcrypt, then creating a unique session token (JWT) for each user on sign up or login. In each request token is sent for a server verification .

## Installation

Install the dependencies and devDependencies.

```sh
npm i
```

The axios and socket baseURL as well as the firebase configuration object must be changed, then you can run:

```sh
npm start
```

<!-- USAGE -->

## APP OVERVIEW

#### Registration & Login

Username can have letters, numbers, hypen and underscore, password must have at least 8 characters, both fields 40 characters maximum length.

<p align="center">
    <img src="https://firebasestorage.googleapis.com/v0/b/react-chat-67a93.appspot.com/o/LoginReactChat.jpg?alt=media&token=0687cd74-98f0-483e-ae99-c5e40fe7ecce" alt="ReactChatLogin" >

</p>

#### Home & Create a chat

<p align="center">
    <img src="https://firebasestorage.googleapis.com/v0/b/react-chat-67a93.appspot.com/o/HomeReactChat.jpg?alt=media&token=a0f0daaa-a35f-4149-b948-60adea9becf4" alt="ReactChatHome" >

</p>

Once you press create chat, a modal window opens where you can search for users by unique username, a regular expression evaluates search, you can add or remove users from the creation list, once ready click on create.

<p align="center">
    <img src="https://firebasestorage.googleapis.com/v0/b/react-chat-67a93.appspot.com/o/CreateChat.jpg?alt=media&token=ba1e53ba-3590-4c7d-9359-b5f976e3e041" alt="CreateaChat" >

</p>

#### Chat Page

<p align="center">
    <img src="https://firebasestorage.googleapis.com/v0/b/react-chat-67a93.appspot.com/o/ChatReactChat.jpg?alt=media&token=e2f49982-f5a5-4846-8d56-8bbd7c0ab9e6" alt="ChatReactChat" >

</p>

#### Page is fully responsive

<p align="center">
    <img src="https://firebasestorage.googleapis.com/v0/b/react-chat-67a93.appspot.com/o/LoginMobile.png?alt=media&token=7da9ed3b-3a0a-48bf-8687-d5974fdb15ac" alt="ReactChatLoginMobile" >
	<br />
	<img src="https://firebasestorage.googleapis.com/v0/b/react-chat-67a93.appspot.com/o/HomeMobile.png?alt=media&token=3dea9a73-8253-4fc6-add9-036d001b12e2" alt="ReactChatHomeMobile" >
	<br />
	<img src="https://firebasestorage.googleapis.com/v0/b/react-chat-67a93.appspot.com/o/ChatMobile.png?alt=media&token=bd506427-b84c-4f95-9722-55ebf8125598" alt="ReactChatMobile" >

</p>

<!-- ACKNOWLEDGEMENTS -->

## Languages and Tools:

<p align="left"> 
<img src="https://www.vectorlogo.zone/logos/gnu_bash/gnu_bash-icon.svg" alt="bash" width="40" height="40"/> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/>  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/>  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/>  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/>  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/>  <img src="https://img.icons8.com/color/452/material-ui.png" alt="Material UI" width="40" height="40"/>  <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/>  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/>  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/>   <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/>   <img src="https://marketplace.squiz.net/__data/assets/image/0024/27285/json-web-token-thumbnail.png" alt="JWT" width="40" height="40"/>  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Socket-io.svg/240px-Socket-io.svg.png" alt="socket.io" width="40" height="40"/>  <img src="https://img.icons8.com/color/452/firebase.png" alt="firebase" width="40" height="40"/>  <img src="https://i.imgur.com/0fbJECr.png" alt="heroku" width="40" height="40"/> </p>
