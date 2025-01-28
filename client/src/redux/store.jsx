// userSlice, bookingSLice, and flighSlice

// create the store

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import bookingReducer from './bookingSlice';
import flightReducer from './flightSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        booking: bookingReducer,
        flight: flightReducer
    }
});

