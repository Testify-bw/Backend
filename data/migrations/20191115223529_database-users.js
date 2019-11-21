
exports.up = function (knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments('id');
    tbl
      .varchar('username', 128)
      .notNullable()
      .unique();
    tbl
      .varchar('password', 255)
      .notNullable();
    tbl
      .varchar('first_name', 128);
    tbl
      .varchar('last_name', 128);
    tbl.varchar('role', 48)
      .notNullable();
  })

};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
