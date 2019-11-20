exports.up = function (knex) {
  return knex.schema.createTable("submitted_answers", table => {
    table.increments('id');
    table.integer("question_id").unsigned().notNullable().references("id").inTable("questions").onDelete("cascade").onUpdate('cascade');
    table.integer("submission_id").unsigned().notNullable().references("id").inTable("student_submissions").onDelete("cascade").onUpdate('cascade');
    table.string("answer", 128).notNullable();
    table.boolean("is_correct").notNullable();
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("submitted_answers");
};
