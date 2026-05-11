const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  travelTime: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  gravity: {
    type: String,
  },
  temperature: {
    type: String,
  },
  atmosphere: {
    type: String,
  },
  image: {
    type: String,
    default: '/destinations/default.jpg',
  },
  gallery: [String],
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  highlights: [String],
  dangerLevel: {
    type: String,
    enum: ['Low', 'Moderate', 'High', 'Extreme'],
    default: 'Moderate',
  },
  oxygenLevel: {
    type: String,
    default: 'Artificial',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Destination', destinationSchema);
