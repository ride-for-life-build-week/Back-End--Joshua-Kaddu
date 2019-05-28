const bcrypt = require('bcryptjs');

// const Users = require('../users/users-model.js');
const jwt = require('jsonwebtoken');
const secrets = require('./auth-router.js');

module.exports = (req, res, next) => {
	const token = req.headers.authorization;
	jwt.verify(token, secrets, (err, decodedToken) => {
		if (err) {
			// token not valid or expired
			res.status(401).json({ message: 'need token' });
		} else {
			// token is valid and can read the decodedToken
			req.decodedToken = decodedToken;
			next();
		}
	});
};
