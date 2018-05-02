const faker = require('faker');
const db = require('./index.js');
const moment = require('moment');

let bookings = [];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let i = 0; i < 2000000; i++) {
    const booking = {};
    booking.room_id = i;
    booking.room_name = faker.random.words();
    booking.world_name = faker.random.words();
    booking.keywords = faker.random.words();
    booking.room_rate = getRandomInt(20, 2000);
    booking.booked_dates = []
}