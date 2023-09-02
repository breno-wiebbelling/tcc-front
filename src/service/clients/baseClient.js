import axios from "axios";

const baseInstance =  axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "70ebe86d1b8da.vercel.app",
  headers: { 
    "Content-Type": "application/json" 
  },
});

export default baseInstance;
