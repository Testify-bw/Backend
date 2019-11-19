
exports.up = function (knex) {
  return knex.schema.createTable("classes", tbl => {
    tbl.increments('id');
    tbl.string("class_name", 128).unique().notNullable();
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("classes");
};
