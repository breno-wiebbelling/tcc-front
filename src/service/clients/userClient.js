import baseClient from "./baseClient";
import { storeToken } from "../authService";

const APP_HOST = 'restmup.shop';
const DOT = '.';
const HTTP = 'https://'

export const createUser = async (user) => {
    return await baseClient
        .post('/user/', user)
        .then(response => {
            return performLogin( response.data );
        });
}

export const validateNameAndEmailEligibility = async ( username, email ) => {
    return ( 
        await baseClient.post( 
            '/user/verifyEligibility', 
            { "username":username, "email":email }
        )
    )['data'];
}

export const login = async ( email, password ) => {
    return baseClient
        .post( '/user/login', { "email":email, "password":password } )
        .then( response => {
            return performLogin(response.data);
        })
}

const performLogin = ( data ) => {
    if ( 'token' in data){
        storeToken(data.token);
        return true;
    } 
    return false;
}

export const getUserHost = async () => {
    let name = 'name';
    return `${HTTP}${name}${DOT}${APP_HOST}`
}

