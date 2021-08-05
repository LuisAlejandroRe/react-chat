const firebaseConfig = {
  apiKey: "AIzaSyA0-4IFU6LkeJjzdhm3RZdAOZqJ2L8FbKs",
  authDomain: "react-chat-67a93.firebaseapp.com",
  projectId: "react-chat-67a93",
  storageBucket: "react-chat-67a93.appspot.com",
  messagingSenderId: "991491930385",
  appId: "1:991491930385:web:84ecd2e2a2fb817da174b0",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
