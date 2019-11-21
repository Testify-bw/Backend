const db = require('../data/db-config');

module.exports = {
  get,
  getById,
  add,
  addToClass
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

function addToClass(user_id, class_id) {
  const relation = {
    user_id,
    class_id
  }
  return db('user_classes')
    .insert(relation, 'id')
    .then(ids => {
      return db('user_classes as uc')
        .join('classes as c', 'uc.class_id', 'c.id')
        .join('users as u', 'uc.user_id', 'u.id')
        .select('u.username', 'c.class_name')
        .where('uc.id', id)
    })
}