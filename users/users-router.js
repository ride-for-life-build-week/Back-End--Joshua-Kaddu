const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted.js');

// returns list of all users
router.get('/', (req, res) => {
	Users.find()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((err) => res.send(err));
});

// adds new user
router.post('/', () => {
	Users.insert(req.body)
		.then((id) => {
			Users.where({ id }).first().then((res) => {
				res.status(200).json(res);
			});
		})
		.catch((err) => {
			res.status(500).json(err.message);
		});
});

module.exports = router;
