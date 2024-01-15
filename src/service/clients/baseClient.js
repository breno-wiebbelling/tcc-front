import axios from "axios";
import { getToken } from '../authService'

const baseInstance =  axios.create({
  baseURL: "http://localhost:8080",
  headers: { 
    "Content-Type": "application/json",
  },
});

baseInstance.interceptors.request.use(function (config) {
  const token = getToken();
  config.headers.Authorization =  token ? token : '';

  return config;
});

baseInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if(error.response.data.error){
      return Promise.reject(error.response.data.error);
    }

    return Promise.reject(error.message);
  }
);

export default baseInstance;