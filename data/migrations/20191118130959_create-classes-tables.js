
exports.up = function (knex) {
  return knex.schema.createTable("classes", table => {
    tbl.increments('id');
    table.string("class_name", 128).unique().notNullable();
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("classes");
};
