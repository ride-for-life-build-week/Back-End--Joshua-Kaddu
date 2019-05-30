exports.up = function(knex) {
	return knex.schema.createTable('driver reviews', (tbl) => {
		tbl.increments();
		tbl.string('review').notNullable();
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('driver reviews');
};
