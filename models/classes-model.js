const db = require('../data/db-config');

module.exports = {
  get
}

function get() {
  return db('classes')

}

function getById(id) {
  return db('classes')
    .where({ id })
}

function add(newClass) {
  return db('classes')
    .insert(newClass, 'id')
    .then(ids => {
      const [id] = ids;
      return getById(id)
    })
}