const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  room_id: {
    type: Number,
    index: true,
    unique: true,
  },
  room_name: String,
  world_name: String,
  keywords: String,
  room_rate: Number,
  booked_dates: [Date],
  guest_number: Number,
  guest_name: String,
  host_name: String,
  discount: Boolean,
  cleaning_fee: Boolean,
  review_count: Number,
  review_grade: Number,
  created_date: Date,
});

const Room = mongoose.model('Room', bookingSchema);

module.exports.Room = Room;
