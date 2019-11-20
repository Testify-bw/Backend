
exports.up = function (knex) {
  return knex.schema.createTable('question_answers', tbl => {
    tbl.increments('id');
    tbl
      .varchar('correct_answer', 255)
      .notNullable();
    tbl
      .integer('question_id', 255)
      .unsigned()
      .references('id')
      .inTable('questions')
      .onDelete('cascade')
      .onUpdate('cascade')
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('question_answers')
};
