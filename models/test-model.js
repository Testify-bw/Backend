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
    const { test_name, author_id, questions, class_id } = submission
    const test = {
        test_name,
        author_id,
        class_id
    }

    return db('tests')
        .insert(test, 'id')
        .then(ids => {
            const [id] = ids

            questions.map(question => {
                const { short_answer, text, question_choices } = question
                let newQuestion = {
                    short_answer,
                    text,
                    test_id: id
                }
                db('questions')
                    .insert(newQuestion, 'id')
                    // insert options
                    .then(ids => {

                        console.log(`ids after insert newQuestion`, ids)
                        const { answer } = question
                        const [question_id] = ids
                        insertAnswer(answer, question_id)

                        question_choices ? insertChoices(question_choices, question_id) : null

                    })
            })
                .then(findTestById(id))
        })
}



function insertChoices(choices, id) {
    choices.map(choice => {

        const choiceEntry = {
            choice,
            question_id: id
        };

        db('question_choices')
            .insert(choiceEntry)
    })
}

function insertAnswer(answer, id) {

    const answerEntry = {
        correct_answer: answer,
        question_id: id
    };

    return db('question_answers')
        .insert(answerEntry)

}

function update(id, changes) {
    return db('tests')
        .insert(changes)
        .where('tests.id', id)
        .then(findTestById(id))
}

function remove(id) {
    return db('tests')
        .where('tests.id', id)
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

