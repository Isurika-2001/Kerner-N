import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, LinearProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFlights } from '../redux/flightSlice';

const FlightsPage = () => {
  const dispatch = useDispatch();
  const { flights, loading, error } = useSelector((state) => state.flight);

  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  const handleSearch = () => {
    if (departureCity && arrivalCity) {
      dispatch(fetchFlights(departureCity, arrivalCity));
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'flightNumber', headerName: 'Flight Number', width: 150 },
    { field: 'departureCity', headerName: 'Departure City', width: 150 },
    { field: 'arrivalCity', headerName: 'Arrival City', width: 150 },
    { field: 'departureTime', headerName: 'Departure Time', width: 200 },
    { field: 'arrivalTime', headerName: 'Arrival Time', width: 200 },
    { field: 'price', headerName: 'Price ($)', width: 100 },
    { field: 'seatsAvailable', headerName: 'Seats Available', width: 150 },
  ];

  const rows = flights.map((flight) => ({
    id: flight._id, // Assuming _id from MongoDB
    flightNumber: flight.flightNumber,
    departureCity: flight.departureCity,
    arrivalCity: flight.arrivalCity,
    departureTime: new Date(flight.departureTime).toLocaleString(),
    arrivalTime: new Date(flight.arrivalTime).toLocaleString(),
    price: flight.price,
    seatsAvailable: flight.seatsAvailable,
  }));

  return (
    <Box sx={{ padding: 4 }}>
      <h1>Flight Search</h1>

      <Box sx={{ display: 'flex', gap: 2, marginBottom: 4 }}>
        <TextField
          label="Departure City"
          value={departureCity}
          onChange={(e) => setDepartureCity(e.target.value)}
        />
        <TextField
          label="Arrival City"
          value={arrivalCity}
          onChange={(e) => setArrivalCity(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search Flights
        </Button>
      </Box>

      {loading ? (
        <p><LinearProgress /></p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      )}
    </Box>
  );
};

export default FlightsPage;
