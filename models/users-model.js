// Model for user registration and logging in
const db = require('../data/db-config');

module.exports = {
  find,
  findBy,
  findAllBy,
  findById,
  add,
  getUserClasses,
  getUserTests
}

function find() {
  return db('users')
    // add class relation once table is created
    .select('id', 'username', 'first_name', 'last_name', 'role')
}

function findBy(filter) {
  return db('users')
    .where(filter)
    .first();
}

function findAllBy(filter) {
  return db('users')
    .select('id', 'username', 'first_name', 'last_name', 'role')
    .where(filter)
}

function findById(id) {
  return db('users')
    .select('id', 'username', 'first_name', 'last_name', 'role')
    .where({ id })
    .first();
}

function add(user) {
  return db('users')
    .insert(user, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id)
    })
}


function getUserTests(id) {
  return db
    .select('classes as c', 'users as u')
    .join('user_classes as uc')
}

function getUserClasses(id) {
  return db('user_classes as uc')
    .select('class_name', 'classes.id')
    .join('classes', 'classes.id', 'uc.class_id')
    .where({'uc.user_id': id});
}