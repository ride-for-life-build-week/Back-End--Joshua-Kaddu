exports.up = function(knex, Promise) {
	return knex.schema.createTable('drivers', (tbl) => {
		tbl.increments();
		tbl.string('username').notNullable().unique();
		tbl.string('password').notNullable();
		tbl.string('email').notNullable();
		tbl.string('name').notNullable();

		tbl.integer('driver_id').unsigned().notNullable().references('id').inTable('users');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('drivers');
};
