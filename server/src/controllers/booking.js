const BookingSchema = require('../models/booking');

// get bookings based on user id
async function getBookings(req, res) {
    try {
        const { userId } = req.params;
        const bookings = await BookingSchema.find({ userId });
        res.json(bookings);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// add a new booking to the database
async function addBooking(req, res) {
    try {
        const { userId, flightId, seats } = req.body;
        const booking = new BookingSchema({ userId, flightId, seats });
        await booking.save();
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getBookings,
    addBooking
};
