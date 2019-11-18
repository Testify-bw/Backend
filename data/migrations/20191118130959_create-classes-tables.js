
exports.up = function(knex) {
  return knex.schema.createTable("classes", table => {
      table.increments();
      table.string("class_name", 128).unique();
  })
};

exports.down = function(knex) {
  
};
