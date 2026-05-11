const express = require('express');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');
const router = express.Router();

// GET /api/bookings — current user's bookings
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching bookings' });
  }
});

// POST /api/bookings — create a new booking
router.post('/', auth, async (req, res) => {
  try {
    const { destination, departureDate, returnDate, passengers, seatClass, totalPrice } = req.body;

    if (!destination || !departureDate || !totalPrice) {
      return res.status(400).json({ message: 'Destination, departure date, and total price are required' });
    }

    const booking = await Booking.create({
      user: req.user.id,
      destination,
      departureDate,
      returnDate,
      passengers: passengers || 1,
      seatClass: seatClass || 'economy',
      totalPrice,
      status: 'confirmed',
    });

    const populated = await booking.populate('destination', 'name tagline image travelTime');
    res.status(201).json(populated);
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Server error creating booking' });
  }
});

// DELETE /api/bookings/:id — cancel booking
router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user.id });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    booking.status = 'cancelled';
    await booking.save();
    res.json({ message: 'Booking cancelled', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
