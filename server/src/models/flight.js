const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
    flightNumber: { type: String, required: true },
    departureCity: { type: String, required: true },
    arrivalCity: { type: String, required: true },
    departureTime: { type: Date, required: false },
    arrivalTime: { type: Date, required: false },
    price: { type: Number, required: false },
    seatsAvailable: { type: Number, required: false },
}, {
    timestamps: true  
});

const Task = mongoose.model('Flight', BookingSchema);

module.exports = Task;