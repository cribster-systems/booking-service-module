const faker = require('faker');
const db = require('../graphql/server.js');
// const fs = require('fs');
const { Room } = require('../graphql/models/booking.js');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
} // min and max inclusive

function generateBookedDates() {
  const bookedDates = [];
  const numDaysBooked = getRandomInt(1, 30);
  for (let i = 0; i < numDaysBooked; i++) {
    bookedDates.push(faker.date.between('2018-06-19', '2018-10-31'));
  }
  return bookedDates;
}

function create1k(loopNumber) {
  return new Promise((resolve, reject) => {
    const bookings = [];
    for (let i = 1; i <= 1000; i++) {
      const booking = {};
      booking.room_id = i + loopNumber;
      booking.room_name = faker.random.words();
      booking.world_name = faker.random.words();
      booking.keywords = faker.random.words();
      booking.room_rate = getRandomInt(20, 2000);
      booking.booked_dates = generateBookedDates();
      booking.guest_number = getRandomInt(100, 10000000);
      booking.guest_name = `${faker.name.firstName()} ${faker.name.lastName()}`;
      booking.host_name = `${faker.name.firstName()} ${faker.name.lastName()}`;
      booking.discount = faker.random.boolean();
      booking.cleaning_fee = faker.random.boolean();
      booking.review_count = getRandomInt(1, 2000);
      booking.review_grade = getRandomInt(2, 5);
      booking.created_date = faker.date.past();
      bookings.push(JSON.stringify(booking));
    }
    // const tempString = `${bookings.join('\n')}\n`;
    Room.insertMany(bookings, (err, docs) => {
      if (err) {
        reject(err);
      } else {
        resolve(1);
      }
    });
    // fs.appendFile('data.json', tempString, (err) => {
    //   if (err) {reject(err)} else {
    //     resolve(1);
    //   }
    //   console.log('written to file');
    // });
  });

}

function createOne() {
  const booking = {};
  booking.room_id = 0;
  booking.room_name = faker.random.words();
  booking.world_name = faker.random.words();
  booking.keywords = faker.random.words();
  booking.room_rate = getRandomInt(20, 2000);
  booking.booked_dates = generateBookedDates();
  booking.guest_number = getRandomInt(100, 10000000);
  booking.guest_name = `${faker.name.firstName()} ${faker.name.lastName()}`;
  booking.host_name = `${faker.name.firstName()} ${faker.name.lastName()}`;
  booking.discount = faker.random.boolean();
  booking.cleaning_fee = faker.random.boolean();
  booking.review_count = getRandomInt(1, 2000);
  booking.review_grade = getRandomInt(2, 5);
  booking.created_date = faker.date.past();

  const insertBookings = () => {
    db.Room.create(booking);
  };
  insertBookings();
}

// create initial DB
createOne();

async function makeBatch() {
  for (let i = 0; i < 10000; i++) {
    await create1k(i * 1000);
  }
}

makeBatch();

