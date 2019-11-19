
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tests').del()
    .then(function () {
      // Inserts seed entries
      return knex('tests').insert([
        {
          test_name: 'Potions Test',
          class_id: 1,
          author_id: 3,
        },
        {
          test_name: 'Intro To React Test',
          class_id: 2,
          author_id: 3,
        },
        {
          test_name: 'Calculus Test',
          class_id: 1,
          author_id: 3,
        }
      ])

        .then(() => {
          return knex('test_questions').insert([
            //postions quiz questions
            {
              test_id: 1,
              question_text: 'What is not an ingredient of felix felicis?',
              short_answer: false
            },
            {
              test_id: 1,
              question_text: 'The common name of Felix Filicis is Liquid ____',
              short_answer: true
            },
            {
              test_id: 1,
              question_text: 'Felix Filicis has an infinite duration.',
              short_answer: false
            },
            // react questions
            {
              test_id: 2,
              question_text: 'Which of these is not a feature of Reaect?',
              short_answer: false
            },
            {
              test_id: 2,
              question_text: 'The useEffect hook requires this to avoid constant re-renders.',
              short_answer: true
            },
            {
              test_id: 2,
              question_text: 'Redux is the superior state management library.',
              short_answer: false
            },
            // calculus questions
            {
              test_id: 3,
              question_text: 'What is an example of an infinitesimal?',
              short_answer: false
            },
            {
              test_id: 3,
              question_text: 'What is the Differential Calculus process of finding the derivative called?',
              short_answer: true
            },
            {
              test_id: 3,
              question_text: 'Calculus was developed by Isaac Newton and Gottfried Wilhhelm Leibniz independently of one another.',
              short_answer: false
            }
          ])
        })
        .then(() => {
          return knex('question_choices').insert([
            // potions options
            {
              question_id: 1,
              choice: 'Ashwinder Egg'
            },
            {
              question_id: 1,
              choice: 'Squill Bulb'
            }, {
              question_id: 1,
              choice: 'Occamy eggshell'
            }, {
              question_id: 1,
              choice: 'Hotdog'
            },
            {
              question_id: 2,
              choice: 'true'
            },
            {
              question_id: 2,
              choice: 'false'
            },
            // react options
            {
              question_id: 4,
              choice: 'Responsive rendering'
            },
            {
              question_id: 4,
              choice: 'Reactive to state changes'
            }, {
              question_id: 4,
              choice: 'Virtual DOM'
            }, {
              question_id: 4,
              choice: 'Hotdog'
            },
            {
              question_id: 5,
              choice: 'true'
            },
            {
              question_id: 5,
              choice: 'false'
            },
            // calculus options
            {
              question_id: 7,
              choice: '11'
            },
            {
              question_id: 7,
              choice: '3'
            }, {
              question_id: 7,
              choice: '2'
            }, {
              question_id: 7,
              choice: '1/2'
            },
            {
              question_id: 8,
              choice: 'true'
            },
            {
              question_id: 8,
              choice: 'false'
            },
          ])
        })
        .then(() => {
          return knex('test_question_answer')([
            {
              question_id: 1,
              correct_answer: 'Hotdog'
            },
            {
              question_id: 2,
              correct_answer: 'Luck'
            },
            {
              question_id: 3,
              correct_answer: 'false'
            },

            // react answers
            {
              question_id: 4,
              correct_answer: 'Hotdog'
            },
            {
              question_id: 5,
              correct_answer: 'Dependency Array'
            },
            {
              question_id: 6,
              correct_answer: 'true'
            },
            //  calculus answers
            {
              question_id: 7,
              correct_answer: 'Hotdog'
            },
            {
              question_id: 8,
              correct_answer: 'Differentiation'
            },
            {
              question_id: 9,
              correct_answer: 'true'
            },
          ])
        })
    });
};
