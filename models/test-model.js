const db = require("../data/db-config");

module.exports = {
    findTestById: id => {
        return db("tests")
        .select("test_name", "question_text", "short_answer", "choice", "question_id")
        .join("test_questions", "tests.id", "test_id")
        .leftJoin("question_choices", "test_questions.id", "question_id")
        .where({"tests.id": id});
    },
    findUserTestsById: id => {
        return db("user_classes")
        .join("tests", "tests.class_id", "user_classes.class_id")
        .where({user_id: id});
    }
}