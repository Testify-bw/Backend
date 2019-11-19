const requireValidToken = require("../middleware/requireValidToken");
const testRouter = require("express").Router();
const testModel = require("../models/test-model");

testRouter.get("/:id", /*requireValidToken,*/ (req, res) => {
    testModel.findTestById(req.params.id)
    .then(test => {
        if(!test) {
            res.status(404).json({message: "no test found with that id"})
            return;
        }

        testModel.findQuestionsByTestId(req.params.id)
        .then(questions => {
            res.status(200).json({
                test_name: test.test_name,
                questions: questions
            });
        })
        .catch(() => res.status(500).json({message: "could not retrieve test questions"}));
    })    
    .catch(error => {console.log(error);res.status(500).json({message: "could not retrieve test"})})
});

module.exports = testRouter;