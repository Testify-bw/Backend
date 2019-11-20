
exports.up = function (knex) {
  return knex.schema.createTable('question_choices', tbl => {
    tbl.increments('id');
    tbl
      .varchar('choice', 255)
      .notNullable()
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
  return knex.schema.dropTableIfExists('question_choices');
};
