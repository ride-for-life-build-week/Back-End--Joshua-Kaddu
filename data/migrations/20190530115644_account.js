exports.up = function(knex, Promise) {
	return knex.schema.createTable('drivers', (tbl) => {
		tbl.increments();
		tbl.string('username').notNullable().unique();
		tbl.string('password').notNullable();
		tbl.string('email').notNullable();
		tbl.string('name').notNullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('drivers');
};
