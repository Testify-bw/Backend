
const express = require('express');

const apiRouter = require('./api-router');
const configureMiddleWare = require('./middleware-config');



const server = express();
configureMiddleWare(server);


server.use('/api', apiRouter);

// Generic reply from server.
server.get("/", (req, res) => {
  res.json({ message: 'API is running.' });
});

module.exports = server;