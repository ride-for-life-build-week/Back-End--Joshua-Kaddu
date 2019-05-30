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
module.exports = router;
