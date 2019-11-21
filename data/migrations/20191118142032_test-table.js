
exports.up = function (knex) {
  return knex.schema.createTable('tests', tbl => {
    tbl.increments('id');
    tbl
      .varchar('test_name', 255)
      .notNullable()
    tbl
      .integer('test_length', 255)
    tbl
      .integer('class_id', 255)
      .unsigned()
      .references('id')
      .inTable('classes')
      .onDelete('cascade')
    tbl
      .integer('author_id', 255)
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('cascade')
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('tests');
};