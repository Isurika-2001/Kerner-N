const flightModel = require('../models/flight');

// get flights based on departure and arrival city
async function getFlights(req, res) {
    try {
        const { departureCity, arrivalCity } = req.query;

        // ignore case when searching for departure and arrival city
        departureCity = new RegExp(departureCity, 'i');
        arrivalCity = new RegExp(arrivalCity, 'i');

        const flights = await flightModel.find({ departureCity, arrivalCity });
        res.json(flights);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// add a new flight to the database
async function addFlight(req, res) {
    try {
        const { flightNumber, departureCity, arrivalCity, departureTime, arrivalTime, price, seatsAvailable } = req.body;
        const flight = new flightModel({ flightNumber, departureCity, arrivalCity, departureTime, arrivalTime, price, seatsAvailable });
        await flight.save();
        res.json(flight);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getFlights,
    addFlight,
};
