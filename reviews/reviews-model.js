const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
	find,
	findById,
	insert,
	update,
	remove
};

function find() {
	return db('reviews');
}

function findById(id) {
	return db('reviews').where({ id: Number(id) });
}

function insert(review) {
	return db('reviews').insert(review).then((ids) => ({ id: ids[0] }));
}

function update(id, review) {
	return db('reviews').where('id', Number(id)).update(review);
}

function remove(id) {
	return db('reviews').where('id', Number(id)).del();
}
