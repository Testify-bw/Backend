const db = require('../data/db-config');

module.exports = {
  get,
  getById,
  getByTest,
  add,
  remove,
  update,
  getAnswerForQuestion
}

function get() {
  return db('questions')
}

function getById(id) {
  return db('questions')
    .where('id', id)
}

function getByTest(test_id) {
  return db('questions')
    .where('test_id', id)
}


function add(submission) {
  return db('questions')
    .insert(submission, 'id')
    .then(ids => {
      const [id] = ids;
      return getById(id)
    })
}

function remove(id) {
  return db('questions')
    .where('id', id)
    .del()
}

function update(id, changes) {
  return db('questions')
    .where('id', id)
    .update(changes)
    .then(() => {
      return getById(id)
    })
}

// returns matching answer for question_id
function getAnswerForQuestion(q_id) {
  return db('answers')
    .where('question_id', q_id)

}