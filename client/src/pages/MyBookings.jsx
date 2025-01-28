import React, { useEffect } from 'react';
import { Box, Button, Typography, LinearProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../redux/bookingSlice';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert2';

const MyBookings = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.booking);
  const { userId } = useParams(); 
  
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
      text: 'Error while loading.',
      icon: 'error',
      background: '#f44336',
      color: 'white',
    });
  };

  const columns = [
    { field: 'id', headerName: 'Booking ID', width: 150 },
    { field: 'flightId', headerName: 'Flight ID', width: 150 },
    { field: 'departureCity', headerName: 'Departure City', width: 180 },
    { field: 'arrivalCity', headerName: 'Arrival City', width: 180 },
    { field: 'seats', headerName: 'Seats', width: 100 },
    { field: 'bookingDate', headerName: 'Booking Date', width: 180 },
  ];

  const rows = bookings.map((booking) => ({
    id: booking._id,
    flightId: booking.flightId._id,
    departureCity: booking.flightId.departureCity,
    arrivalCity: booking.flightId.arrivalCity,
    seats: booking.seats,
    bookingDate: new Date(booking.bookingDate).toLocaleString(),
  }));
  
  useEffect(() => {
    // Fetch bookings for the user when the component mounts
    if (userId) {
      dispatch(fetchBookings(userId)); 

      if (error) {
        errorMessage();
      }
    }
  }, [dispatch, userId]);

  return (
    <Box sx={{ padding: 4 }}>
      <h1>
        My Bookings
      </h1>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <LinearProgress />
        </Box>
      ): (
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

export default MyBookings;
