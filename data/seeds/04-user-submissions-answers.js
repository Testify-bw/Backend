
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('student_submissions').del()
    .then(function () {
      // Inserts seed entries
      return knex('student_submissions').insert([
        {
          student_id: 1,
          test_id: 1,
          submission_number: 1,
          percent_correct: 1
        },
        {
          student_id: 2,
          test_id: 1,
          submission_number: 1,
          percent_correct: 0
        },
        {
          student_id: 2,
          test_id: 2,
          submission_number: 1,
          percent_correct: .8
        }
      ])
        .then(() => {
          return knex('submitted_answers').insert([
            {
              question_id: 1,
              submission_id: 1,
              answer: 'Hotdog',
              is_correct: true
            },
            {
              question_id: 2,
              submission_id: 1,
              answer: 'Luck',
              is_correct: true
            },
            {
              question_id: 3,
              submission_id: 1,
              answer: 'false',
              is_correct: true
            },
            {
              question_id: 1,
              submission_id: 2,
              answer: 'Ashwinder Egg',
              is_correct: false
            },
            {
              question_id: 2,
              submission_id: 2,
              answer: 'Courage',
              is_correct: false
            },
            {
              question_id: 3,
              submission_id: 2,
              answer: 'true',
              is_correct: false
            },
            {
              question_id: 1,
              submission_id: 3,
              answer: 'Hotdog',
              is_correct: true
            },
            {
              question_id: 2,
              submission_id: 3,
              answer: 'Deduction',
              is_correct: false
            },
            {
              question_id: 3,
              submission_id: 3,
              answer: 'false',
              is_correct: false
            },
          ])
        })
    });
};
