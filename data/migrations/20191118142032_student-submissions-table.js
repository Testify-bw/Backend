
exports.up = function(knex) {
  return knex.schema.createTable("student_submissions", table => {
    table.increments();
    table.integer("student_id").notNullable().references("id").inTable("users");
    table.integer("test_id").notNullable().references("id").inTable("tests");
    table.integer("submission_number");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.float("percent_correct", {precision: 2}).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("student_submissions");
};
