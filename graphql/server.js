require('newrelic');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema.js');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const cluster = require('cluster');

const app = express();

if (cluster.isMaster) {
  // Count the machine's CPUs
  const cpuCount = require('os').cpus().length;

  // Create a worker for each CPU
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
} else {
  // bind express with graphql
  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
  }));

  // app.use(cors());
  app.use('/:id', express.static(path.join(__dirname, '/../client/dist')));

  mongoose.connect('mongodb://localhost/bookings');

  mongoose.connection.once('open', () => {
    console.log('connected to database');
  });


  app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
  });
}
