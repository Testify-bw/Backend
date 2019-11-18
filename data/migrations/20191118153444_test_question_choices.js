
exports.up = function (knex) {
  return knex.schema.createTable('question_choices', tbl => {
    tbl.increments();
    tbl
      .varchar('choice', 255)
      .notNullable()
    tbl
      .integer('question_id', 255)
      .unsigned()
      .references('id')
      .inTable('test_questions')
      .onDelete('cascade')
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('question_choices');
};
