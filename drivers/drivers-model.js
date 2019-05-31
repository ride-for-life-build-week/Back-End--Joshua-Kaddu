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
	return db('drivers').select('id', 'username', 'password');
}

function findBy(filter) {
	return db('drivers').where(filter);
}

async function add(driver) {
	const [ id ] = await db('drivers').insert(driver);

	return findById(id);
}

function findById(id) {
	return db('drivers').where({ id }).first();
}
function update(id, driver) {
	return db('drivers').where('id', Number(id)).update(driver);
}
function remove(id) {
	return db('drivers').where('id', id).del();
}
