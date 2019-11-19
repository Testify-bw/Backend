const db = require("../data/db-config");

module.exports = {
    findTestById: id => {
        return db("tests")
        .select("test_name", "question_text", "short_answer", "choice", "question_id")
        // .select("test_name", "question_text", "short_answer")
        .join("test_questions", "tests.id", "=", "test_id")
        .leftJoin("question_choices", "test_questions.id", "question_id")
        .where({"tests.id": id});
        // .first();
    }
    ,
    findQuestionsByTestId: testId => {
        db("tests")
        .select("test_name", "question_text", "short_answer")
        // .select("test_name", "question_text", "short_answer")
        .join("test_questions", "tests.id", "=", "test_id")
        .join("question_choices", "question_id", "=", "test_questions.id")
        .where({"tests.id": testId})
        .then(q => console.log(q))
    //     return db("test_questions")
    //     .select("question_text", "short_answer", "choice")
    //     .join("question_choices", "test_questions.id", "question_id")
    //     .groupBy("test_questions.id")
    //     .where({test_id: testId});
    }
}