exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', (tbl) => {
		tbl.increments();
		tbl.string('username').notNullable().unique();
		tbl.string('password').notNullable();
		tbl.string('email').notNullable();
		tbl.string('name').notNullable();
		tbl.boolean('driver').notNullable().defaultTo(false);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('users');
};
