exports.up = function(knex, Promise) {
	return knex.schema.createTable('reviews', (tbl) => {
		tbl.increments();
		tbl.string('review').notNullable();

		tbl.integer('driver_id').unsigned().notNullable().reference('id').inTable('drivers');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('reviews');
};
