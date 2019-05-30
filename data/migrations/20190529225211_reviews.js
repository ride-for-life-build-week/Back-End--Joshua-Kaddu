exports.up = function(knex) {
	return knex.schema.createTable('driver reviews', (users) => {
		users.increments();

		users.string('reviews').notNullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('driver reviews');
};
