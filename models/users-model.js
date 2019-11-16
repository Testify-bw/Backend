// Model for user registration and logging in
const db = require('../data/db-config');

module.exports = {
  find,
  findBy,
  findById,
  add
}

function find() {
  return db('users')
    .select('id', 'username', 'first_name', 'last_name', 'role')
}

function findBy(filter) {
  return db('users')
    .where(filter)
    .first()
}

function findById(id) {
  return db('users')
    .select('id', 'username', 'first_name', 'last_name', 'role')
    .where({ id })
    .first();
}

function add(user) {
  return db('users')
    .insert(user)
    .then(ids => {
      const [id] = ids;
      return findById(id)
    })
}


