import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/userSlice'; 
import { TextField, Button, CircularProgress, Box, Typography } from '@mui/material';
import swal from 'sweetalert2';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
      return;
    }
    const userData = { username, email, password };
    dispatch(registerUser(userData));

    if (error) {
        errorMessage();
        }
        else {
        successMessage();
        }
  };

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
          title: 'Register Successful!',
          text: 'You have been registered successfully.',
          icon: 'success',
          background: '#4caf50',
          color: 'white',
        });
      };
    
      const errorMessage = () => {
        Toast.fire({
          title: 'Register Failed!',
          text: 'Please enter a valid username, email, and password.',
          icon: 'error',
          background: '#f44336',
          color: 'white',
        });
      };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, padding: 2, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Register</Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {loading ? (
          <CircularProgress sx={{ display: 'block', margin: '10px auto' }} />
        ) : (
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        )}
      </form>
    </Box>
  );
};

export default Register;
