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
    return db('question_answers')
        .insert(answerEntry)
        .then(console.log(answerEntry, `submitted`))
}


function update(id, changes) {
    return db('tests')
        .where('tests.id', id)
        .update(changes)
        .then(() => {
            return getById(id)
        })
}

function remove(id) {
    return db('tests')
        .where('id', id)
        .del()
}


module.exports = {
    findTestById,
    findUserTestsById,
    insertTest,
    insertChoices,
    insertAnswer,
    remove,
    update
}

