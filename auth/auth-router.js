const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');
const Drivers = require('../users/users-model.js');

// for endpoints beginning with /auth
router.post('/register', (req, res) => {
	let user = req.body;
	const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
	user.password = hash;

	Users.add(user)
		.then((saved) => {
			res.status(201).json(saved);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

router.post('/login', (req, res) => {
	let { username, password } = req.body;

	Users.findBy({ username })
		.first()
		.then((user) => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken(user);
				res.status(200).json({
					message: `Welcome ${user.username}!`,
					token
				});
			} else {
				res.status(401).json({ message: 'Invalid Credentials' });
			}
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

// router.post('/register/driver', (req, res) => {
// 	let driver = req.body;
// 	const hash = bcrypt.hashSync(driver.password, 10); // 2 ^ n
// 	driver.password = hash;

// 	Drivers.add(driver)
// 		.then((saved) => {
// 			res.status(201).json(saved);
// 		})
// 		.catch((error) => {
// 			res.status(500).json(error);
// 		});
// });

// router.post('/login/driver', (req, res) => {
// 	let { username, password } = req.body;

// 	Users.findBy({ username })
// 		.first()
// 		.then((user) => {
// 			if (user && bcrypt.compareSync(password, driver.password)) {
// 				const token = generateToken(driver);
// 				res.status(200).json({
// 					message: `Welcome ${driver.username}!`,
// 					token
// 				});
// 			} else {
// 				res.status(401).json({ message: 'Invalid Credentials' });
// 			}
// 		})
// 		.catch((error) => {
// 			res.status(500).json(error);
// 		});
// });

function generateToken(user) {
	const payload = {
		subject: user.id, // what the token is describing
		username: user.username
	};

	const secret = 'keep it a secret, keep it safe';

	const options = {
		expiresIn: '1h'
	};
	return jwt.sign(payload, secret, options);
}

module.exports = router;
