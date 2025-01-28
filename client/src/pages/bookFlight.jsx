import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { bookAFlight } from '../redux/bookingSlice';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert2';

const BookFlight = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.booking); // Use 'booking' state, not 'flight'

  // Get the flight id from URL params
  const { flightId } = useParams();
  const { departureCity, arrivalCity } = useParams();

  const [seats, setSeats] = useState(1); // State to store the number of seats

  // Initialize SweetAlert2 toast settings
  const Toast = swal.mixin({
    toast: true,
    position: 'bottom-end',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  // Success and error toast message functions
  const successMessage = () => {
    Toast.fire({
      title: 'Booking Successful!',
      text: 'Your flight has been booked successfully.',
      icon: 'success',
      background: '#4caf50',
      color: 'white',
    });
  };

  const errorMessage = () => {
    Toast.fire({
      title: 'Booking Failed!',
      text: 'Please enter a valid number of seats.',
      icon: 'error',
      background: '#f44336',
      color: 'white',
    });
  };

  useEffect(() => {
  }, [dispatch]);

  const handleBook = () => {
    if (seats <= 0) {
      errorMessage(); // Show error message if number of seats is invalid
      return;
    }

    const bookingData = {
      flightId,
      userId: "67986aedc81681ecac318c38", // Assuming you will dynamically pass the user ID
      seats,
    };

    // Dispatch the action to book the flight
    dispatch(bookAFlight(bookingData));

    if (!loading && !error) {
      successMessage(); // Show success message if booking is successful
    }

    if (error) {
      errorMessage(); // Show error message if booking fails
    }

  };

  return (
    <Box sx={{ padding: 4 }}>
      <h1>Book Your Flight</h1>

      <Box sx={{ display: 'flex', gap: 2, marginBottom: 4 }}>
        <TextField
          label="Departure City"
          value={departureCity}
          disabled // Making it read-only as it's coming from URL
        />
        <TextField
          label="Arrival City"
          value={arrivalCity}
          disabled // Making it read-only as it's coming from URL
        />
        <TextField
          label="Number of Seats"
          type="number"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          inputProps={{ min: 1 }}
        />

        <Button variant="contained" onClick={handleBook}>
          {loading ? <CircularProgress size={24} /> : 'Book Flight'}
        </Button>
      </Box>
    </Box>
  );
};

export default BookFlight;
