const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// import routes
const flightRoutes = require('./routes/flight');
const bookingRoutes = require('./routes/booking');
const authRoutes = require('./routes/auth');

const authMiddleware = require('./middleware/auth');

// apply auth middleware for flight and booking routes

// app.use('/api/flights', authMiddleware, flightRoutes);
// app.use('/api/bookings', authMiddleware, bookingRoutes);

// unauthorized for testing purposes
app.use('/api/flights', flightRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);

// default route
app.get('/', (req, res) => {
    res.send('Welcome to the flight booking system API');
});

// connect to mongodb 
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(err));

// start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server running on ", port));
