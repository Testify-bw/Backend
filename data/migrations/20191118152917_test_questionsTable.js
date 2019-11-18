
exports.up = function (knex) {
  return knex.schema.createTable('test_questions', tbl => {
    tbl.increments();
    tbl
      .integer('test_id', 255)
      .unsigned()
      .references('id')
      .inTable('tests')
      .onDelete('cascade');
    tbl
      .varchar('question_text', 255)
      .notNullable()

  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('test_questions');
};
