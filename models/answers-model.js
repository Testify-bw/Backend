const db = require('../data/db-config');

module.exports = {
  get,
  getById,
  getByTest,
  add,
  remove,
  update
}

function get() {
  return db('answers')
}

function getById(id) {
  return db('answers')
    .where('id', id)
}

function getByTest(test_id) {
  return db('answers')
    .where('test_id', id)
}


function add(answer) {
  return db('answers')
    .insert(answer, 'id')
    .then(ids => {
      const [id] = ids;
      return getById(id)
    })
}

function remove(id) {
  return db('answers')
    .where('id', id)
    .del()
}

function update(id, changes) {
  return db('answers')
    .where('id', id)
    .update(changes)
    .then(() => {
      return getById(id)
    })
}