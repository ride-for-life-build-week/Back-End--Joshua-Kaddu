exports.up = function(knex, Promise) {
	return knex.schema.createTable('reviews', (tbl) => {
		tbl.increments();
		tbl.string('review').notNullable();

		tbl.integer('driver_id').unsigned().notNullable().reference('id').inTable('users');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('reviews');
};
