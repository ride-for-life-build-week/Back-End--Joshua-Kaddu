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

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	Users.remove(id)
		.then((deleted) => {
			if (deleted === 0) {
				res.status(404).json({ error: 'Driver ID not found.' });
			}
			res.status(200).json({ message: 'Driver Deleted' });
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const user = req.body;

	if (!user.id) {
		res.status(404).json({ message: 'Please provide Driver ID.' });
	}
	Users.update(id, user)
		.then((user) => {
			if (!user) {
				res.status(404).json({ message: 'Driver with ID was not found.' });
			}
			res.status(200).json(user);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

module.exports = router;
