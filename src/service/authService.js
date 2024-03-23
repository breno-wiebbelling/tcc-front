import {getUserHost, login} from "./clients/userClient";

const user_id_key = "user_id";
export const user_host_key = "user_host";

export const storeToken = ( user_id ) => {
    sessionStorage.setItem(user_id_key, user_id);
    getUserHost().then(userHost => {
      sessionStorage.setItem(user_host_key, userHost);
    })
}

export const getToken = () => {
    return sessionStorage.getItem( user_id_key );
}

export const isLoggedIn = () => {
  return login("breno@gmail.com", "Breno123*")
    .then( any => {
      return true;
    })

    // return ( sessionStorage.getItem( user_id_key ) !== null );
}