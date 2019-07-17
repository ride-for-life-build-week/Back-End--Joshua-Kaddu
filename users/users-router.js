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
router.post('/', (req, res) => {
	const user = req.body;

	Users.add(user)
		.then((saved) => {
			res.status(201).json(saved);
		})
		.catch((error) => {
			res.status(500).json(error.message);
		});
});

module.exports = router;

// router.get('/', async (req, res) => {
// 	try {
// 		const property = await Db.find();
// 		res.status(200).json(property);
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json(error.message);
// 	}
// });

// router.post('/', async (req, res) => {
// 	try {
// 		const property = await Db.add(req.body);
// 		res.status(201).json(property);
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json(error.message);
// 	}
// });
