const db = require("../data/db-config");


const findTestById = id => {
    return db("tests")

    .select("test_name", "question_text", "short_answer", "choice", "test_questions.id as question_id", "correct_answer")
    .join("test_questions", "tests.id", "test_id")
    .join("test_question_answer", "test_question_answer.question_id", "test_questions.id")
    .leftJoin("question_choices", "test_questions.id", "question_choices.question_id")
    .where({"tests.id": id});

}
const findUserTestsById = id => {
    return db("user_classes")
    .join("tests", "tests.class_id", "user_classes.class_id")
    .where({ user_id: id });
}
function insertTest(submission) {
    console.log(`insertTest submission`, submission);
    const { test_name, author_id, questions, class_id } = submission
    const test = {
        test_name,
        author_id,
        class_id
    }
    console.log(`test object`, test);

    // insert test into tests table, then retrieve its id
    return db('tests')
        .insert(test, 'id')
        .then(ids => {
            const [id] = ids
            // add questions

            questions.map(question => {
                console.log(`mapped question`, question)
                const { short_answer, text, question_choices } = question
                let newQuestion = {
                    short_answer,
                    text,
                    test_id: id
                }
                console.log(`inserting newQuestion`, newQuestion)
                db('questions')
                    .insert(newQuestion, 'id')
                    // insert options
                    .then(ids => {
                        // console.log(`~~
                        // QUESTION~ 
                        // ~~~`, question)
                        console.log(`ids after insert newQuestion`, ids)
                        const { answer } = question
                        const [question_id] = ids
                        insertAnswer(answer, question_id)
                        // console.log(`answer from question`, answer)
                        // console.log(`question_choices`, question_choices)
                        question_choices ? insertChoices(question_choices, question_id) : null

                    })
            })
                .then(() => { return findTestById(id) })
        })
}

function insertChoices(choices, id) {
    choices.map(choice => {

        const choiceEntry = {
            choice,
            question_id: id
        };
        console.log(`inserting choiceEntry`, choiceEntry)
        db('question_choices')
            .insert(choiceEntry)
            .then()
    })
}

function insertAnswer(answer, id) {
    const answerEntry = {
        correct_answer: answer,
        question_id: id
    };
    console.log(`inserting answerEntry`, answerEntry)
    return db('question_answers')
        .insert(answerEntry)
        .then(console.log(answerEntry, `submitted`))
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

=======
module.exports = {
    findTestById,
    findUserTestsById,
    insertTest,
    insertChoices,
    insertAnswer
}

