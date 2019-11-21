const db = require("../data/db-config");


const findTestById = id => {
    return db("tests")

        .select("test_name", "text", "short_answer", "choice", "questions.id as question_id", "correct_answer")
        .join("questions", "tests.id", "test_id")
        .join("question_answers", "question_answers.question_id", "questions.id")
        .leftJoin("question_choices", "questions.id", "question_choices.question_id")
        .where({ "tests.id": id });

}
const findUserTestsById = id => {
    return db("user_classes")
        .join("tests", "tests.class_id", "user_classes.class_id")
        .where({ user_id: id });
}
function insertTest(submission) {
    // console.log(`insertTest submission`, submission);
    

    // console.log(`test object`, test);

    const { test_name, author_id, class_id } = submission
    
    const test = {
        test_name,
        author_id,
        class_id
    }

    console.log("insertTest")
    console.log("_______________________________________")


    // insert test into tests table, then retrieve its id
    return db('tests')
        .insert(test, 'id')
        .then(ids => {
            const [test_id] = ids;

            const questions = [], choiceArrs = [], answers = [];

            submission.questions.map(question => {
                const {text, short_answer, question_choices, answer} = question;

                questions.push({text, short_answer, test_id});
                choiceArrs.push(question_choices);
                answers.push(answer);
            });

            // console.log("questions=", questions);

            return db("questions")
            .insert(questions, "id")
            .then(ids => {
                const [lastId] = ids;
                const firstId = lastId - questions.length + 1;

                const choicesToInsert = [];
                const answersToInsert = [];

                // choices.map((choice, idx) => choice.question_id = firstId + idx);

                choiceArrs.forEach((arr, idx) => {
                    answersToInsert.push({correct_answer: answers[idx], question_id: firstId + idx});
                    arr.forEach((choice) => {
                        choicesToInsert.push({choice: choice, question_id: firstId + idx})
                    });
                });

                return db("question_choices")
                .insert(choicesToInsert, "id")
                .then(ids => {
                    return db("question_answers")
                    .insert(answersToInsert);
                });
            });
        })
    // .then(() => { return findTestById(id) })
}

function insertChoices(choices, id) {
    choices.map(choice => {

        const choiceEntry = {
            choice,
            question_id: id
        };
        // console.log(`inserting choiceEntry`, choiceEntry)
        db('question_choices')
            .insert(choiceEntry)
            .then()
    })
}

function insertAnswer(answer, id) {
    // console.log("correct_answer:",answer);
    const answerEntry = {
        correct_answer: answer,
        question_id: id
    };
    // console.log(`inserting answerEntry`, answerEntry)
    return db('question_answers')
        .insert(answerEntry)
        .then(/*console.log(answerEntry, `submitted`)*/)
}


// function updateAnswer(id, newAnswer) {

//     return db('test_question_answer as a')
//         .where('a.id', id)
//         .update({correct_answer: newAnswer})
// }

// function updateQuestion(id, newQuestion) {
//     return db ('test_questions as q')
//         .where('q.id', id)
//         .update(newQuestion)
// }



// function getSubmissionsByStudent(id) {
//     // shows username from users, test name from test, array of questions and answers
//     let query = db('student_submissions as sub')
//             .select('sub.id', 'sub.test_id', 'sub.submission_number', 'sub.submission_time', 'sub.student_id', 'users.username')
//             .join('submitted_answer as ans', 'sub.id', 'ans.submission_id')
//             .join('users', 'sub.student_id', 'users.id')
//             .join('test_questions as tq', 'sub.test_id', 'tq.test_id' )
//             .join('tests', 'sub.test_id', 'tests.id')

// }


module.exports = {
    findTestById,
    findUserTestsById,
    insertTest,
    insertChoices,
    insertAnswer
}

