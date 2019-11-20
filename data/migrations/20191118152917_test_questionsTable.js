
exports.up = function (knex) {
  return knex.schema.createTable('questions', tbl => {
    tbl.increments('id');
    tbl
      .boolean('short_answer')
      .notNullable()
    tbl
      .integer('test_id', 255)
      .unsigned()
      .references('id')
      .inTable('tests')
      .onDelete('cascade')
      .onUpdate('cascade')
    tbl
      .varchar('text', 255)
      .notNullable()
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('questions');
};
