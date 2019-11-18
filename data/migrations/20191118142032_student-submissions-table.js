
exports.up = function(knex) {
  return knex.schema.createTable("student_submissions", table => {
    table.increments();
    table.integer("student_id").unsigned().notNullable().references("id").inTable("users").onDelete('cascade');
    table.integer("test_id").unsigned().notNullable().references("id").inTable("tests").onDelete('cascade');
    table.integer("submission_number");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.float("percent_correct", {precision: 2}).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("student_submissions");
};
