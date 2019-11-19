
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tests').del()
    .then(function () {
      // Inserts seed entries
      return knex('tests').insert([
        {
          test_name: "math test 1",
          class_id: 1,
        }
      ]);
    })
    .then(function() {
      return knex("test_questions").del()
      .then(function () {
        return knex("test_questions").insert([
          {
            test_id: 1,
            question_text: "7 x 7",
            is_fill_in_blank: false
          },
          {
            test_id: 1,
            question_text: "4 x 4",
            is_fill_in_blank: true
          }, 
          {
            test_id: 1,
            question_test: "0^1 = 1",
            is_fill_in_blank: false
          }
        ]);        
      });
    })
    .then(function() {
      return knex("question_choices").del()
      .then(function() {
        return knex("question_choices").insert([
          {question_id: 1, choice: "7"},
          {question_id: 1, choice: "49"},
          {question_id: 1, choice: "0"},
          {question_id: 3, choice: "true"},
          {question_id: 3, choice: "false"}
        ])
      })
    })
    .then(function() {
      return knex("test_question_answer").del()
      .then(function() {
        return knex("test_question_answer").insert([
          {question_id: 1, correct_answer: "49"},
          {question_id: 2, correct_answer: "16"},
          {question_id: 3, correct_answer: "true"}
        ])
      })
    })
};
