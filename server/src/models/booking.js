const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
    seats: { type: Number, required: true },
}, {
    timestamps: true  
});

const Task = mongoose.model('Booking', BookingSchema);

module.exports = Task;