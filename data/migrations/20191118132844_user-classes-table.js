
exports.up = function (knex) {
  return knex.schema.createTable("user_classes", table => {
    tbl.increments('id');
    table.integer("user_id").unsigned().notNullable().references("id").inTable("users").onDelete('cascade');
    table.integer("class_id").unsigned().notNullable().references("id").inTable("classes").onDelete('cascade');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user-classes");
};
