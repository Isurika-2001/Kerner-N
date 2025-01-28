import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, LinearProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFlights } from '../redux/flightSlice';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';

const FlightsPage = () => {
  const dispatch = useDispatch();
  const { flights, loading, error } = useSelector((state) => state.flight);
  const navigate = useNavigate();

  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');

  const Toast = swal.mixin({
      toast: true,
      position: 'top',
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast',
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });

  const errorMessage = () => {
    Toast.fire({
      title: 'Search Failed!',
      text: 'Please enter both departure and arrival cities.',
      icon: 'error',
      background: '#f44336',
      color: 'white',
    });
  };

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  const handleSearch = () => {
    if (departureCity && arrivalCity) {
      dispatch(fetchFlights(departureCity, arrivalCity));
    }

    else {
      errorMessage();
    }
  };

  const columns = [
    { field: 'flightNumber', headerName: 'Flight Number', width: 150, flex: 1 },
    { field: 'departureCity', headerName: 'Departure City', width: 150, flex: 1 },
    { field: 'arrivalCity', headerName: 'Arrival City', width: 150, flex: 1 },
    { field: 'departureTime', headerName: 'Departure Time', width: 200, flex: 2 },
    { field: 'arrivalTime', headerName: 'Arrival Time', width: 200, flex: 2 },
    { field: 'price', headerName: 'Price ($)', width: 100, flex: 1 },
    { field: 'seatsAvailable', headerName: 'Seats Available', width: 150, flex: 1 },
    // action button to book a flight
    {
      field: 'book',
      headerName: 'Book Flight',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          // onclick navigate to the booking page with the flight id
          onClick={() => {
            navigate(`/bookFlight/${params.row.id}/${params.row.departureCity}/${params.row.arrivalCity}`);
          }}
        >
          Book
        </Button>
      ),
    },
  ];

  const rows = flights.map((flight) => ({
    id: flight._id, 
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
