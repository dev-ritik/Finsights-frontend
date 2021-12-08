import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {API_URL} from "../constants";
import {addAlert} from "./Alert";


const initialState = {
    refreshToken: localStorage.getItem('refreshToken'),
    accessToken: localStorage.getItem('accessToken'),
    fullName: localStorage.getItem('fullName'),
    email: localStorage.getItem('email'),
    phone: localStorage.getItem('phone')
}

export const login = createAsyncThunk(
    'userInfo/login',
    async (payload, {dispatch}) => {
        return await axios.request({
            method: 'POST',
            url: `${API_URL}/user/login`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                'email': payload.email,
                'password': payload.password
            }
        }).then(function (response) {
            return response.data
        })
            .catch(function (error) {
                if (!error.response && error.message === "Network Error") {
                    dispatch(addAlert({
                        title: "Error!",
                        message: "Check your internet connection",
                        colour: "danger"
                    }));
                } else if (error.response.status === 400 || error.response.status === 401) {
                    let message = "";
                    for (const [key, value] of Object.entries(error.response.data)) {
                        message += value + " "
                    }
                    dispatch(addAlert({
                        title: "Error!",
                        message: message,
                        colour: "danger"
                    }));
                }
                throw error;
            });

    }
)

export const register = createAsyncThunk(
    'userInfo/register',
    async (payload, {dispatch}) => {
        return await axios.request({
            method: 'POST',
            url: `${API_URL}/user/register`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                'email': payload.email,
                'password': payload.password
            }
        }).then(response => response.data)
            .catch(function (error) {
                if (!error.response && error.message === "Network Error") {
                    dispatch(addAlert({
                        title: "Error!",
                        message: "Check your internet connection",
                        colour: "danger"
                    }));
                } else if (error.response.status === 400) {
                    let message = "";
                    for (const [key, value] of Object.entries(error.response.data)) {
                        message += value + " "
                    }
                    dispatch(addAlert({
                        title: "Error!",
                        message: message,
                        colour: "danger"
                    }));
                }
                throw error;
            });
    }
)

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        logout: () => {
            clearLocalStorage()
            return {
                refreshToken: null,
                accessToken: null,
                fullName: null,
                email: null,
                phone: null,
            }
        },
    },
    extraReducers: {
        [login.fulfilled]: (state, data) => {
            localStorage.setItem('refreshToken', data.payload.refresh);
            localStorage.setItem('accessToken', data.payload.access);
            localStorage.setItem('fullName', data.payload.user.get_full_name);
            localStorage.setItem('email', data.payload.user.email);
            localStorage.setItem('phone', data.payload.user.phone);
            return {
                ...state,
                refreshToken: data.payload.refresh,
                accessToken: data.payload.access,
                fullName: data.payload.user.get_full_name,
                email: data.payload.user.email,
                phone: data.payload.user.phone,
            }
        },
        [register.fulfilled]: (state, data) => {
            localStorage.setItem('refreshToken', data.payload.refresh);
            localStorage.setItem('accessToken', data.payload.access);
            localStorage.setItem('fullName', data.payload.user.get_full_name);
            localStorage.setItem('email', data.payload.user.email);
            localStorage.setItem('phone', data.payload.user.phone);
            return {
                ...state,
                refreshToken: data.payload.refresh,
                accessToken: data.payload.access,
                fullName: data.payload.user.get_full_name,
                email: data.payload.user.email,
                phone: data.payload.user.phone,
            }
        },
    }
})

const clearLocalStorage = () => {
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('fullName')
    localStorage.removeItem('email')
    localStorage.removeItem('phone')
}

async function refreshAccessToken(refreshToken) {
    return await axios.request({
            method: 'POST',
            url: `${API_URL}/user/refresh`,
            data: {
                'refresh': `${refreshToken}`
            }
        }
    ).then(res => {
        localStorage.setItem('accessToken', res.data.access);
        return res.data.access
    }).catch(function (error) {
        if (!error.response && error.message === "Network Error") {
            throw error("NETWORK ERROR")
        } else if (error.response.status === 400 || error.response.status === 401) {
            let message = "";
            for (const [key, value] of Object.entries(error.response.data)) {
                message += value + " "
            }
            throw error(message);
        }
        throw error;
    });
}

const isTokenExpired = (token) => {
    let decoded_token = JSON.parse(atob(token.split('.')[1]));
    return (decoded_token.exp * 1000 - 60000) <= Date.now();
}

export const checkAndFetchValidAccessKey = async () => {
    let accessToken = localStorage.getItem('accessToken')
    let refreshToken = localStorage.getItem('refreshToken')

    if (accessToken) {
        if (!isTokenExpired(accessToken)) {
            // Access token hasn't expired
            return accessToken
        } else {
            if (refreshToken) {
                if (!isTokenExpired(refreshToken)) {
                    // Access token hasn't expired
                    return refreshAccessToken(refreshToken)
                }
            }
        }
    } else if (refreshToken) {
        // Check if refresh token is valid
        if (!isTokenExpired(refreshToken)) {
            // Access token hasn't expired
            return refreshAccessToken(refreshToken)
        }
    }

    clearLocalStorage()
    throw new Error(`Token expired. Pls login`);
}

export const {logout} = userInfoSlice.actions

export default userInfoSlice.reducer