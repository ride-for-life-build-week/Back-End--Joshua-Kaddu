exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', (tbl) => {
		tbl.increments();
		tbl.string('username').notNullable().unique();
		tbl.string('password').notNullable();
		tbl.string('email');
		tbl.string('name');
		tbl.boolean('driver').defaultTo(false);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('users');
};
