const router = require('express').Router();

const Drivers = require('../drivers/drivers-model.js');
// const restricted = require('../auth/restricted.js');

router.get('/', (req, res) => {
	Drivers.find()
		.then((drivers) => {
			res.json(drivers);
		})
		.catch((err) => res.send(err));
});

router.post('/review', (req, res) => {
	let user = req.body;

	Drivers.add(user)
		.then((saved) => {
			res.status(201).json(saved);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

router.delete('/review/:id', (req, res) => {
	const { id } = req.params;
	Drivers.remove(id)
		.then((deleted) => {
			if (deleted === 0) {
				res.status(404).json({ error: 'Driver ID not found.' });
			}
			res.status(200).json.end();
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.put('/review/:id', (req, res) => {
	const { id } = req.params;
	const user = req.body;

	if (!user.review) {
		res.status(404).json({ message: 'Please provide driver review.' });
	}
	Drivers.update(id, user)
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
