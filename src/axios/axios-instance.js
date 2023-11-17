import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5175",
});

export default instance;
