// Model for user registration and logging in
const db = require('../data/db-config');

module.exports = {
  find,
  findBy,
  findAllBy,
  findById,
  add,
  getUserClasses,
  getUserTests,
  removeUserClasses,
  addUserClasses
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

function removeUserClasses(id) {
  return db("user_classes")
  .del()
  .where({"user_id": id});
}

function addUserClasses(id, classes) {
  console.log("classes:", typeof classes);

  const classesToInsert = classes.map(classId => {
    return {user_id: id, class_id: classId}
  });

  return db("user_classes")
  .insert(classesToInsert);
  
  /*return db('classes')
    .select('class_name', 'id')
    .join('user_classes as uc', 'id', 'uc.id')
    .where('uc.user_id', id)*/
}