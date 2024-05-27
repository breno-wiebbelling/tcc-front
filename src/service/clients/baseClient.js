import axios from "axios";
import { getToken } from '../authService'

const BASE_URL_HOST = process.env.REACT_APP_BACK_END_URL;

const baseInstance =  axios.create({
  baseURL: BASE_URL_HOST,
  headers: { 
    "Content-Type": "application/json",
  },
});

baseInstance.interceptors.request.use(function (config) {
  const token = getToken();
  config.headers.Authorization =  token ? token : '';
  baseInstance.defaults.headers = config.headers; 
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
