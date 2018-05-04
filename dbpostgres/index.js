const pg = require('pg');

const pgClient = new pg.Client({
  host: '172.17.0.2',
  user: 'postgres',
  database: 'bookings',
});

pgClient.connect();

module.exports = pgClient;
