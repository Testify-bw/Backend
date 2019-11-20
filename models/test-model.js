const db = require("../data/db-config");

module.exports = {
    findTestById,
    findUserTestsById,
    insertTest
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
                return db('test_questions')
                    .insert(newQuestion, 'id')
                    // insert options
                    .then(ids => {
                        // console.log(`~~
                        // QUESTION~ 
                        // ~~~`, question)
                        console.log(`ids after insert newQuestion`, ids)
                        const { answer } = question
                        const [question_id] = ids
                        // console.log(`answer from question`, answer)
                        // console.log(`question_choices`, question_choices)
                        question_choices ? insertChoices(question_choices, question_id) : null

                        insertAnswer(answer, question_id)
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
    })
}

function insertAnswer(answer, id) {
    const answerEntry = {
        answer,
        question_id: id
    };
    console.log(`inserting answerEntry`, answerEntry)
    return db('test_question_answer')
        .insert(answerEntry)
}