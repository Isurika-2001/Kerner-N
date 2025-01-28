import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userSlice'; 
import { TextField, Button, CircularProgress, Box, Typography } from '@mui/material';
import swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(loginUser(userData));

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
        title: 'Login Successful!',
        text: 'You have been logged in successfully.',
        icon: 'success',
        background: '#4caf50',
        color: 'white',
      });
    };
  
    const errorMessage = () => {
      Toast.fire({
        title: 'Login Failed!',
        text: 'Please enter a valid email and password.',
        icon: 'error',
        background: '#f44336',
        color: 'white',
      });
    };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, padding: 2, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Login</Typography>

      <form onSubmit={handleSubmit}>
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
        
        {loading ? (
          <CircularProgress sx={{ display: 'block', margin: '10px auto' }} />
        ) : (
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        )}
      </form>
    </Box>
  );
};

export default Login;
