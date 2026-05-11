const express = require('express');
const Destination = require('../models/Destination');
const router = express.Router();

// GET /api/destinations — list all destinations
router.get('/', async (req, res) => {
  try {
    const { featured } = req.query;
    const filter = {};
    if (featured === 'true') filter.featured = true;
    const destinations = await Destination.find(filter).sort({ featured: -1, rating: -1 });
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching destinations' });
  }
});

// GET /api/destinations/:id — single destination
router.get('/:id', async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    res.json(destination);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
