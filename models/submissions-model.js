const db = require('../data/db-config');

module.exports = {
  get,
  getById,
  getByTest,
  getByUser,
  add,
  remove,
  update
}

function get() {
  return db('submissions')
}

function getById(id) {
  return db('submissions')
    .where('id', id)
}

function getByTest(test_id) {
  return db('submissions')
    .where('test_id', id)
}

function getByUser(user_id) {
  return db('submissions')
    .where('user_id', user_id)
}


function add(submission) {
  return db('submissions')
    .insert(submission, 'id')
    .then(ids => {
      const [id] = ids;
      return getById(id)
    })
}

function remove(id) {
  return db('submissions')
    .where('id', id)
    .del()
}

function update(id, changes) {
  return db('submissions')
    .where('id', id)
    .update(changes)
    .then(() => {
      return getById(id)
    })
}