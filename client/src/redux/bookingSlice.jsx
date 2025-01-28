// create bookingSlice for booking a flight and fetching bookings based on user id

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config';

export const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        bookings: [],
        loading: false,
        error: null
    },
    reducers: {
        getBookings: (state) => {
            state.loading = true;
        },
        getBookingsSuccess: (state, action) => {
            state.bookings = action.payload;
            state.loading = false;
            state.error = null;
        },
        getBookingsFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        bookFlight: (state) => {
            state.loading = true;
        },
        bookFlightSuccess: (state, action) => {
            state.bookings.push(action.payload);
            state.loading = false;
            state.error = null;
        },
        bookFlightFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { getBookings, getBookingsSuccess, getBookingsFailed, bookFlight, bookFlightSuccess, bookFlightFailed } = bookingSlice.actions;

export const fetchBookings = (userId) => async (dispatch) => {
    dispatch(getBookings());
    try {
        const response = await axios.get(`${config.API_URL}/bookings?userId=${userId}`);
        dispatch(getBookingsSuccess(response.data));
    } catch (error) {
        dispatch(getBookingsFailed(error.message));
    }
}

export const bookAFlight = (bookingData) => async (dispatch) => {
    dispatch(bookFlight());
    try {
        const response = await axios.post(`${config.API_URL}/bookings`, bookingData);
        dispatch(bookFlightSuccess(response.data));
    } catch (error) {
        dispatch(bookFlightFailed(error.message));
    }
}

export default bookingSlice.reducer;
