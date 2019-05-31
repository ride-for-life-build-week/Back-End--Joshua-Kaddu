const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const driversRouter = require('../drivers/drivers-router.js');
const reviewRouter = require('../reviews/reviews-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/drivers', driversRouter);
server.use('/api/reviews', reviewRouter);

server.get('/', (req, res) => {
	res.send('Living');
});

module.exports = server;
