const router = require('express').Router();

const Users = require('./users-model.js');
// const restricted = require('../auth/restricted.js');

router.get('/', (req, res) => {
	Users.find()
		.then((users) => {
			res.json(users);
		})
		.catch((err) => res.send(err));
});

router.post('/review', (req, res) => {
	let user = req.body;

	Users.add(user)
		.then((saved) => {
			res.status(201).json(saved);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	Users.remove(id)
		.then((deleted) => {
			if (deleted === 0) {
				res.status(404).json({ error: 'User ID not found.' });
			}
			res.status(200).json.end();
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const user = req.body;

	if (!user.username || !user.password) {
		res.status(404).json({ message: 'Please provide name and description.' });
	}
	Users.update(id, user)
		.then((user) => {
			if (!user) {
				res.status(404).json({ message: 'User with ID was not found.' });
			}
			res.status(200).json(user);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

module.exports = router;
