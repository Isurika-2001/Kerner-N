// create the flightSlice for fetching flights based on departure and arrival city from req.params and add new flights to the database

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const flightSlice = createSlice({
    name: 'flight',
    initialState: {
        flights: [],
        loading: false,
        error: null
    },
    reducers: {
        getFlights: (state) => {
            state.loading = true;
        },
        getFlightsSuccess: (state, action) => {
            state.flights = action.payload;
            state.loading = false;
            state.error = null;
        },
        getFlightsFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addFlight: (state) => {
            state.loading = true;
        },
        addFlightSuccess: (state, action) => {
            state.flights.push(action.payload);
            state.loading = false;
            state.error = null;
        },
        addFlightFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { getFlights, getFlightsSuccess, getFlightsFailed, addFlight, addFlightSuccess, addFlightFailed } = flightSlice.actions;

export const fetchFlights = (departureCity, arrivalCity) => async (dispatch) => {
    dispatch(getFlights());
    try {
        const response = await axios.get(`/flight?departureCity=${departureCity}&arrivalCity=${arrivalCity}`);
        dispatch(getFlightsSuccess(response.data));
    } catch (error) {
        dispatch(getFlightsFailed(error.message));
    }
}

export const addNewFlight = (flightData) => async (dispatch) => {
    dispatch(addFlight());
    try {
        const response = await axios.post('/flight', flightData);
        dispatch(addFlightSuccess(response.data));
    } catch (error) {
        dispatch(addFlightFailed(error.message));
    }
}

export default flightSlice.reducer;
