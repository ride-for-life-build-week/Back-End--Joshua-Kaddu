const router = require('express').Router();

const Review = require('./reviews-model.js');

// add review
router.post('/', (req, res) => {
	let user = req.body;

	if (user.driver_id) {
		Review.insert(user)
			.then((saved) => {
				res.status(201).json(saved);
			})
			.catch((error) => {
				// error.message allows you to see the error taking place
				res.status(500).json(error.message);
			});
	}
});

// delete review
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	Review.remove(id)
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

// update review
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const user = req.body;

	if (!user.review) {
		res.status(404).json({ message: 'Please provide driver review.' });
	}
	Review.update(id, user)
		.then((user) => {
			if (!user) {
				res.status(404).json({ message: 'Driver with ID was not found.' });
			}
			res.status(200).json({ message: 'Review updated.' });
		})
		.catch((err) => {
			res.status(500).json(err.message);
		});
});

module.exports = router;
