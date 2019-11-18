
exports.up = function (knex) {
  return knex.schema.createTable('tests', tbl => {
    tbl.increments();
    tbl
      .varchar('test_name', 255)
      .notNullable()
    tbl
      .integer('test_length', 255)
    tbl
      .integer('author_id', 255)
      .unsigned()
      .references('id')
      .onTable('users')
      .onDelete('cascade')
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('tests');
};
