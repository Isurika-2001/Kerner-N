import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
        loading: false,
        error: null,
    },
    reducers: {
        register: (state) => {
            state.loading = true;
        },
        registerSuccess: (state, action) => {
            state.token = action.payload; // Store the token
            state.loading = false;
            state.error = null;
            localStorage.setItem('token', action.payload); // Save token to localStorage
        },
        registerFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        login: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.token = action.payload; // Store the token
            state.loading = false;
            state.error = null;
            localStorage.setItem('token', action.payload); // Save token to localStorage
        },
        loginFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('token'); // Remove token on logout
        },
    },
});

export const {
    register,
    registerSuccess,
    registerFailed,
    login,
    loginSuccess,
    loginFailed,
    logout,
} = userSlice.actions;

// Thunk to register a new user
export const registerUser = (userData) => async (dispatch) => {
    dispatch(register());
    try {
        const response = await axios.post(`${config.API_URL}/auth/register`, userData);
        dispatch(registerSuccess(response.data.token)); // Pass only the token
    } catch (error) {
        dispatch(registerFailed(error.message));
    }
};

// Thunk to log in an existing user
export const loginUser = (userData) => async (dispatch) => {
    dispatch(login());
    try {
        const response = await axios.post(`${config.API_URL}/auth/login`, userData);
        dispatch(loginSuccess(response.data.token)); // Pass only the token
    } catch (error) {
        dispatch(loginFailed(error.message));
    }
};

export default userSlice.reducer;
