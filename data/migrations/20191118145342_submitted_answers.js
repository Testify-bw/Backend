exports.up = function(knex) {
    return knex.schema.createTable("submitted_answers", table => {
        table.increments();
        table.integer("question_id").unsigned().notNullable().references("id").inTable("test_questions").onDelete("cascade");
        table.integer("submission_id").unsigned().notNullable().references("id").inTable("student_submissions").onDelete("cascade");
        table.string("answer", 128).notNullable();
        table.boolean("is_correct").notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("submitted_answers");
};
