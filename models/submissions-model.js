const db = require('../data/db-config');

module.exports = {
  get,
  getById,
  getByTest,
  getByUser,
  add,
  remove,
  update,
  getResponsesBySubmission,
  insertStudentSubmission
}

function get() {
  return db('student_submissions')
}

function getById(id) {
  return db('student_submissions')
    .where('id', id)
}

function getByTest(test_id) {
  return db('student_submissions')
    .where('test_id', test_id)
    .first();
}

function getByUser(user_id) {
  return db('student_submissions')
    .where('user_id', user_id)
}


function add(submission) {
  return db('student_submissions')
    .insert(submission, 'id')
    .then(ids => {
      const [id] = ids;
      return getById(id)
    })
}

function remove(id) {
  return db('student_submissions')
    .where('id', id)
    .del()
}

function update(id, changes) {
  return db('student_submissions')
    .where('id', id)
    .update(changes)
    .then(() => {
      return getById(id)
    })
}

// returns each response for a submission
function getResponsesBySubmission(sub_id) {
  return db('submitted_answers as a')
    .where('a.submission_id', sub_id)
}

function insertStudentSubmission(submission) {
  // expect submission object to contain the student id and the test id and an array of answers
  const { student_id, test_id, answers } = submission;
  const submissionEntry = {
    student_id,
    test_id
  }
  return db('student_submissions')
    .insert(submissionEntry, 'id')
    .then(ids => {
      const [id] = ids;
      // iterate over array of answer objects
      answers.map(entry => {
        console.log(`mapped answer entry`, entry);
        // deconstruct question_id and answer
        const { question_id, answer } = entry;
        // place q_id, submission_id, and answer in object to send to insertStudentAnswer
        const submittedAnswer = {
          submission_id: id,
          question_id,
          answer: answer
        }
        insertStudentAnswer(submittedAnswer);
      })
      return getById(id)
    })
}

function insertStudentAnswer(submission) {

  console.log(`inserting student answer`, submission)
  return db('submitted_answer')
    .insert(submission)
    .then(console.log(submission, `submitted`))
}