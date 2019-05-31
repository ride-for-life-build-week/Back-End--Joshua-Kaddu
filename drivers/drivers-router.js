const router = require('express').Router();

const Drivers = require('../drivers/drivers-model.js');

// add new driver
router.post('/', (req, res) => {
	let driver = req.body;

	Drivers.add(driver)
		.then((saved) => {
			res.status(201).json(saved);
		})
		.catch((error) => {
			res.status(500).json(error);
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
	const user = req.body;

	Drivers.update(id, user)
		.then((user) => {
			if (!user) {
				res.status(404).json({ message: 'Driver with ID was not found.' });
			} else {
				res.status(200).json({ message: 'Driver updated.' });
			}
		})
		.catch((err) => {
			res.status(500).json(err.message);
		});
});

module.exports = router;
