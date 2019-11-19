
exports.up = function (knex) {
  return knex.schema.createTable('test_question_answer', tbl => {
    tbl.increments('id');
    tbl
      .varchar('correct_answer', 255)
      .notNullable();
    tbl
      .integer('question_id', 255)
      .unsigned()
      .references('id')
      .inTable('test_questions')
      .onDelete('cascade')
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('test_question_answer')
};
