const db = require('../data/dbConfig.js');

module.exports = {
	update,
	remove
};

function update(id, changes) {
	return db('drivers').where('id', id).update(changes).then((count) => (count > 0 ? this.get(id) : null));
}

function remove(id) {
	return db('drivers').where('id', id).del();
}
