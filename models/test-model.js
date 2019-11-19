const db = require("../data/db-config");

module.exports = {
    findTestById: id => {
        return db("tests")
        .select("test_name")
        .where({id: id})
        .first();
    },
    findQuestionsByTestId: testId => {
        return db("test_questions")
        .select("question_text", "short_answer")
        .where({test_id: testId})
    }
}