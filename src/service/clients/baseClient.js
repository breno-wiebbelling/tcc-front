import axios from "axios";
import { getToken } from '../authService'

const BASE_URL_HOST =
// "https://tcc-back-end.vercel.app";
"http://localhost:8080";

const baseInstance =  axios.create({
  baseURL: BASE_URL_HOST,
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
