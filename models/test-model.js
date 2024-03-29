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


async function insertTest(submission) {
    const { test_name, author_id, questions, class_id } = submission

    const test = {
        test_name,
        author_id,
        class_id
    }


    // insert test into tests table, then retrieve its id
    return await db('tests')
        .insert(test, 'id')
        .then(async ids => {
            const [id] = ids
            // add questions

            questions.map(async question => {

                const { short_answer, text, question_choices } = question
                let newQuestion = {
                    short_answer,
                    text,
                    test_id: id
                }

                return await db('questions')
                    .insert(newQuestion, 'id')
                    // insert options
                    .then(async ids => {


                        const { answer } = question
                        const [question_id] = ids
                        await insertAnswer(answer, question_id)

                        question_choices ? insertChoices(question_choices, question_id) : null

                    })
            })
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
            .then()
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
        .update(changes)
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

