const requireValidToken = require("../middleware/requireValidToken");
const testRouter = require("express").Router();
const testModel = require("../models/test-model");
const ensureUserHasTest = require("../middleware/ensureUserHasTest");

testRouter.get("/test/:id", [requireValidToken, ensureUserHasTest], (req, res) => {
    testModel.findTestById(req.params.id)
        .then(test => {
            if (!test) {
                res.status(404).json({ message: "no test found with that id" })
                return;
            }

            const questions = [];

            test.forEach((item, idx) => {
                const lastItem = test[idx - 1];

                if (idx === 0 || item.question_id !== lastItem.question_id) {
                    questions.push({
                        question_text: item.question_text,
                        short_answer: item.short_answer,
                        choices: item.choice ? [item.choice] : [],
                        answer: req.decodedJwt.role === "instructor" ? item.correct_answer : null
                    });
                } else {
                    questions[questions.length - 1].choices.push(item.choice);
                }
            });

            res.status(200).json({
                name: test[0].test_name,
                questions: questions
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "could not retrieve test" })
        });
});

testRouter.get("/:id/tests", (req, res) => {
    testModel.findUserTestsById(req.params.id)
        .then(tests => {
            res.status(200).json(tests);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "could not retrieve user's tests" });
        });
});

testRouter.post('test/add', requireValidToken, (req, res) => {
    const submission = req.body;
    testModel.insertTest(submission)
        .then(test => {
            res.status(200).json(test)
        })
        .catch(err => {
            res.status(500).json({
                message: `Error adding test to the database.`,
                error: err.toString()
            });
        })
})



// testRouter.post('/test/:test-id/submit-answers', [requireValidToken, ensureUserHasTest], (req, res) => {
//     const submission = {
//         ...req.body,
//         test_id: req.params.test - id
//     }
//     testModel.insertStudentSubmission(submission)
//         .then(submission => {
//             res.status(200).json(submission)
//         })
//         .catch(err => {
//             res.status(500).json({
//                 message: `Error retrieving list of users from the database.`,
//                 error: err.toString()
//             });
//         })
// })

module.exports = testRouter;