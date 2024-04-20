import {getUserHost} from "./clients/userClient";

const user_id_key = "user_id";
export const user_host_key = "user_host";

export const storeToken = ( user_id ) => {
  localStorage.setItem(user_id_key, user_id);
  getUserHost().then(userHost => {
    localStorage.setItem(user_host_key, userHost);
  })
}

export const logout = () => {
  localStorage.clear();
}

export const getToken = () => {
  return localStorage.getItem( user_id_key );
}

export const isLoggedIn = () => {
  return ( localStorage.getItem( user_id_key ) !== null );
}