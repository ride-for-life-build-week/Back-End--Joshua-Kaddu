exports.up = function(knex, Promise) {
	return knex.schema.createTable('reviews', (tbl) => {
		tbl.increments();
		tbl.string('review').notNullable();

		tbl
			.string('driver_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('drivers')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('reviews');
};
