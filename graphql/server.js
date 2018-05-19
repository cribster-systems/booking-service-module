require('newrelic');
// require('../client/dist/app-server.js');
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
  app.use('/graphql', (req, res, next) => {

    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'content-type, authorization, content-length, x-requested-with, accept, origin');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    res.header('Allow', 'POST, GET, OPTIONS')
    res.header('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  }, graphqlHTTP({
    schema,
    graphiql: true,
  }));
  // app.use(cors());

  app.get('/healthcheck', (req, res) => {
    res.sendStatus(200);
  });

  app.use('/:id', express.static(path.join(__dirname, '/../client/dist')));

  mongoose.connect('mongodb://54.193.77.158/bookings');

  mongoose.connection.once('open', () => {
    console.log('connected to database');
  });


  app.listen(7777, () => {
    console.log('now listening for requests on port 7777');
  });
}
