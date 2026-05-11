const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: true,
  },
  departureDate: {
    type: Date,
    required: [true, 'Departure date is required'],
  },
  returnDate: {
    type: Date,
  },
  passengers: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
    default: 1,
  },
  seatClass: {
    type: String,
    enum: ['economy', 'business', 'first', 'luxury'],
    default: 'economy',
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

bookingSchema.pre(/^find/, function () {
  this.populate('destination', 'name tagline image travelTime');
});

module.exports = mongoose.model('Booking', bookingSchema);
