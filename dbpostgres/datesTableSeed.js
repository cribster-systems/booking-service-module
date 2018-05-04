const faker = require('faker');
const db = require('./index.js');
const fs = require('fs');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
} // min and max inclusive

function generateBookedDates() {
  const bookedDates = [];
  const numDaysBooked = getRandomInt(0, 30);
  for (let i = 0; i < numDaysBooked; i++) {
    bookedDates.push(faker.date.between('2018-06-01', '2018-10-31').toISOString());
  }
  return bookedDates;
}

function createBookings(loopNumber) {
  return new Promise((resolve, reject) => {
    const bookings = [];
    for (let i = 1; i <= 5000; i++) {
      const bookedDates = generateBookedDates();
      bookedDates.forEach((date) => {
        const booking = {};
        booking.room_id = i + loopNumber;
        booking.date_booked = date;
        const entry = `${booking.room_id}|${booking.date_booked}`;
        bookings.push(entry);
      });
    }
    const tempString = `${bookings.join('\n')}\n`;
    fs.appendFile('bookedDatesData', tempString, (err) => {
      if (err) { reject(err); } else {
        resolve(1);
      }
      console.log('written to file');
    });
  });
}

async function makeBatch() {
  for (let i = 0; i < 2000; i++) {
    await createBookings(i * 5000);
  }
}

makeBatch();
