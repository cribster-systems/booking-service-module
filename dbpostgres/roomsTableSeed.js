const faker = require('faker');
const db = require('./index.js');
const fs = require('fs');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
} // min and max inclusive

function createRooms(loopNumber) {
  return new Promise((resolve, reject) => {
    const bookings = [];
    for (let i = 1; i <= 5000; i++) {
      const booking = {};
      booking.room_id = i + loopNumber;
      booking.room_name = faker.random.words();
      booking.world_name = faker.random.words();
      booking.keywords = faker.random.words();
      booking.room_rate = getRandomInt(20, 2000);
      booking.guest_number = getRandomInt(100, 10000000);
      booking.guest_name = `${faker.name.firstName()} ${faker.name.lastName()}`;
      booking.host_name = `${faker.name.firstName()} ${faker.name.lastName()}`;
      booking.discount = faker.random.boolean();
      booking.cleaning_fee = faker.random.boolean();
      booking.review_count = getRandomInt(1, 2000);
      booking.review_grade = getRandomInt(2, 5);
      // booking.created_date = faker.date.past().toISOString();
      const entry = `${booking.room_id}|${booking.room_name}|${booking.world_name}|${booking.keywords}|${booking.room_rate}|${booking.guest_number}|${booking.guest_name}|${booking.host_name}|${booking.discount}|${booking.cleaning_fee}|${booking.review_count}|${booking.review_grade}`;
      bookings.push(entry);
    }
    const tempString = `${bookings.join('\n')}\n`;
    fs.appendFile('roomData', tempString, (err) => {
      if (err) { reject(err); } else {
        resolve(1);
      }
      console.log('written to file');
    });
  });
}

async function makeBatch() {
  for (let i = 0; i < 2000; i++) {
    await createRooms(i * 5000);
  }
}

makeBatch();

