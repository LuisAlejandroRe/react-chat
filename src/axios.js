import axios from "axios";

const instance = axios.create({
  baseURL: "https://reactchat-api.herokuapp.com/",
});

export default instance;
