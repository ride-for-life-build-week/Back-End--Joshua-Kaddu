const router = require('express').Router();

const Drivers = require('../drivers/drivers-model.js');

// returns all drivers
router.get('/', (req, res) => {
	Drivers.find()
		.then((drivers) => {
			res.status(200).json(drivers);
		})
		.catch((err) => res.send(err));
});

// add new driver
router.post('/', (req, res) => {
	let driver = req.body;

	Drivers.add(driver)
		.then((saved) => {
			res.status(201).json(saved);
		})
		.catch((error) => {
			res.status(500).json(error.message);
		});
});

// delete driver profile
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	Drivers.remove(id)
		.then((deleted) => {
			if (deleted === 0) {
				res.status(404).json({ error: 'Driver ID not found.' });
			}
			res.status(200).json({ message: 'Driver Deleted' });
		})
		.catch((err) => {
			res.status(500).json(err.message);
		});
});

// edit driver profile
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const driver = req.body;

	Drivers.update(id, driver)
		.then((driver) => {
			// check if exist
			if (!driver) return res.status(404).json({ error: "Specified ID doesn't exist" });
			return res.status(200).json(driver);
		})
		.catch((err) => {
			res.status(500).json(err.message);
		});
});

module.exports = router;
