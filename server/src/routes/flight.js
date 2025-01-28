const express = require('express');
const {
    getFlights,
    addFlight,
} = require('../controllers/flight');

const router = express.Router();

router.get('/', getFlights);
router.post('/', addFlight);

module.exports = router;
