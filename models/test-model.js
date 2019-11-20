const db = require("../data/db-config");

module.exports = {
    findTestById,
    findUserTestsById,
    insertTest,
    updateAnswer,
    insertStudentSubmission
}

function findTestById(id) {
    return db("tests")
        .select("test_name", "question_text", "short_answer", "choice", "question_id")
        .join("test_questions", "tests.id", "test_id")
        .leftJoin("question_choices", "test_questions.id", "question_id")
        .where({ "tests.id": id });
}
function findUserTestsById(id) {
    return db("user_classes")
        .join("tests", "tests.class_id", "user_classes.class_id")
        .where({ user_id: id });
}
function insertTest(submission) {
    console.log(`insertTest submission`, submission);
    const { test_name, author_id, questions } = submission
    const test = {
        test_name,
        author_id
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
                const { short_answer, question_text, question_choices } = question
                let newQuestion = {
                    short_answer,
                    question_text,
                    test_id: id
                }
                console.log(`inserting newQuestion`, newQuestion)
                db('test_questions')
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
            return findTestById(id)
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
    return db('test_question_answer')
        .insert(answerEntry)
        .then(console.log(answerEntry, `submitted`))
}

function updateAnswer(id, newAnswer) {

    return db('test_question_answer as a')
        .where('a.id', id)
        .update({correct_answer: newAnswer})
}

function updateQuestion(id, newQuestion) {
    return db ('test_questions as q')
        .where('q.id', id)
        .update(newQuestion)
}

function insertStudentSubmission(submission) {
// expect submission object to contain the student id and the test id and an array of answers
const { student_id, test_id, answers} = submission;
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
                const {question_id, answer} = entry;
                // place q_id, submission_id, and answer in object to send to insertStudentAnswer
                const submittedAnswer = {
                    submission_id: id,
                    question_id,
                    answer: answer
                }
                insertStudentAnswer(submittedAnswer);
            })
        })
}

function insertStudentAnswer(submission) {

    console.log(`inserting student answer`, submission)
    return db('submitted_answer')
        .insert(submission)
        .then(console.log(submission, `submitted`))
}