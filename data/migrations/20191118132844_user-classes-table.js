
exports.up = function (knex) {
  return knex.schema.createTable("user_classes", table => {
    table.increments('id');
    table.integer("user_id").unsigned().notNullable().references("id").inTable("users").onDelete('cascade').onUpdate('cascade');
    table.integer("class_id").unsigned().notNullable().references("id").inTable("classes").onDelete('cascade').onUpdate('cascade');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user_classes");
};
