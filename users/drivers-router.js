const router = require('express').Router();

const Drivers = require('./drivers-model.js');
// const restricted = require('../auth/restricted.js');

router.get('/api/drivers', (req, res) => {
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
			res.status(200).json.end();
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

module.exports = router;
