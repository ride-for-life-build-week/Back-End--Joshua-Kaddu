exports.up = function(knex) {
	return knex.schema.createTable('users', (tbl) => {
		tbl.increments();
		tbl.string('username').notNullable().unique();
		tbl.string('password').notNullable();
		tbl.string('email').notNullable();
		tbl.string('name').notNullable();
		tbl.boolean('driver').notNullable();
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('users');
};
