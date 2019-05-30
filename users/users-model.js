const db = require('../data/dbConfig.js');

module.exports = {
	add,
	find,
	findBy,
	findById,
	update,
	remove
};

function find() {
	return db('users').select('id', 'username', 'password');
}

function findBy(filter) {
	return db('users').where(filter);
}

async function add(user) {
	const [ id ] = await db('users').insert(user);

	return findById(id);
}

function findById(id) {
	return db('users').where({ id }).first();
}
function update(id, changes) {
	return db('projects').where('id', id).update(changes).then((count) => (count > 0 ? this.get(id) : null));
}

function remove(id) {
	return db('projects').where('id', id).del();
}
