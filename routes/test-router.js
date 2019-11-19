const requireValidToken = require("../middleware/requireValidToken");
const testRouter = require("express").Router();
const testModel = require("../models/test-model");

testRouter.get("/:id", requireValidToken, (req, res) => {
    testModel.findQuestionsByTestId(1);

    testModel.findTestById(req.params.id)
    .then(test => {
        if(!test) {
            res.status(404).json({message: "no test found with that id"})
            return;
        }

        // console.log(test);

        const questions = [];

        test.forEach((item, idx) => {
            const lastItem = test[idx - 1];

            if(idx === 0 || item.question_id !== lastItem.question_id) {
                questions.push({
                            question_text: item.question_text,
                            short_answer: item.short_answer,
                            choices: item.choice ? [item.choice] : []
                        });
            } else {
                questions[questions.length - 1].choices.push(item.choice);
            }
            
            // const lastIdx = questions.length - 1;

            // console.log("item: ", item);
            // console.log("lastItem: ", lastItem);

            // if(lastIdx !== -1 && item.question_id === test[lastIdx].question_id) {
            //     questions[lastIdx].choices.push(item.choice);
            // } else {
            //     console.log("item:", item, "\ntest[lastIdx]:", test[lastIdx])
            //     console.log("-----------------------------------------------")
            //     questions.push({
            //         question_text: item.question_text,
            //         short_answer: item.short_answer,
            //         choices: [item.choice]
            //     });
            // }
        });

        res.status(200).json({
            name: test[0].test_name,
            questions: questions
        });        

        // testModel.findQuestionsByTestId(req.params.id)
        // .then(questions => {
        //     console.log(questions);
        //     res.status(200).json({
        //         test_name: test.test_name,
        //         questions: questions
        //     });
        // })
        // .catch(error => {
        //     console.log(error);
        //     res.status(500).json({message: "could not retrieve test questions"})
        // });
    })    
    .catch(error => {
        console.log(error);
        res.status(500).json({message: "could not retrieve test"})
    });
});

module.exports = testRouter;
