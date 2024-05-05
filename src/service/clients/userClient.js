import baseClient from "./baseClient";
import { storeToken } from "../authService";
import CryptoJS from 'crypto-js'; 

const APP_HOST = 'restmup.site';
const DOT = '.';
const HTTP = 'https://'

async function hashPassword(password) {
    try {
        const hashedPassword = CryptoJS.SHA256(password + 'secretKey').toString(CryptoJS.enc.Hex);

        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

export const createUser = async (user) => {
    user['password'] = await hashPassword(user['password']);
    return await baseClient
        .post('/user/', user)
        .then(response => {
            return performLogin(response.data);
        });
}

export const validateNameAndEmailEligibility = async (username, email) => {
    return (
        await baseClient.post(
            '/user/verifyEligibility',
            { "username": username, "email": email }
        )
    )['data'];
}

export const login = async (email, password) => {
    password = await hashPassword(password);
    return baseClient
        .post('/user/login', { "email": email, "password": password })
        .then(response => {
            return performLogin(response.data);
        })
}

const performLogin = (data) => {
    if ('token' in data) {
        storeToken(data.token);
        return true;
    }
    return false;
}

export const validateHostEligibility = async (hostName) => {
    return (
        await baseClient.post(
            '/user/host',
            { "host": hostName }
        )
    )['data'];
}

export const getUserInfo = async () => {
    return (
        await baseClient.get(
            '/user',
        )
    )["data"];
}

export const getUserHost = async () => {
    let userHost = (await baseClient.get('/user/host'))['data'];

    return `${HTTP}${userHost}${DOT}${APP_HOST}`
}

export const getUserImage = async () => {
    return (
        await baseClient.get(
            '/user/image',
        )
    )["data"];
}

export const updateUserInfo = async (userName, email, host) => {
    return (
        await baseClient.patch(
            '/user',
            {
                username: userName,
                email: email,
                host: host
            }
        )
    )["data"];
}

export const updateUserImage = async (newUserImage) => {
    const formData = new FormData();
    formData.append('newUserImage', newUserImage);

    return (
        await baseClient.patch(
            '/user/image',
            formData,
            {
                ...baseClient.defaults,
                headers: {
                    ...baseClient.defaults.headers,
                    'Content-Type': 'multipart/form-data',
                }
            }
        )
    )["data"];
}

export const verifyUserCredential = async (value, valueName) => {
    return (
        await baseClient.post(
            '/user/verifyCredential',
            { value: value, valuename: valueName }
        )
    )['data']
}