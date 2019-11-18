
exports.up = function(knex) {
  return knex.schema.createTable("user-classes", table => {
      table.increments();
      table.integer("user_id").notNullable().references("users");
      table.integer("class_id").notNullable().references("classes");
  });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("user-classes");
};
