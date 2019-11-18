
exports.up = function(knex) {
    return knex.schema.dropTableIfExists("user-classes")
    .createTable("user-classes", table => {
      table.increments();
      table.integer("user_id").notNullable().references("id").inTable("users");
      table.integer("class_id").notNullable().references("id").inTable("classes");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("user-classes")
    .createTable("user-classes", table => {
      table.increments();
      table.integer("user_id").notNullable().references("user_id").inTable("users");
      table.integer("class_id").notNullable().references("class_id").inTable("classes");
    });
};
