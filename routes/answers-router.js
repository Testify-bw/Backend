const requireValidToken = require("../middleware/requireValidToken");
const testRouter = require("express").Router();
const Answers = require("../models/answers-model");
const ensureUserHasTest = require("../middleware/ensureUserHasTest");

testRouter.delete('/:id', [requireValidToken, ensureUserHasTest], (req, res) => {
  const newAnswer = req.body;
  const id = req.params.id
  Answers.remove(id)
    .then(edit => {
      res.status(200).json(edit)
    })
    .catch(err => {
      res.status(500).json({
        message: `Error retrieving list of users from the database.`,
        error: err.toString()
      });
    })
})

testRouter.put('/:id', [requireValidToken, ensureUserHasTest], (req, res) => {
  const newAnswer = req.body;
  const id = req.params.id
  Answers.updateAnswer(id, newAnswer)
    .then(edit => {
      res.status(200).json(edit)
    })
    .catch(err => {
      res.status(500).json({
        message: `Error retrieving list of users from the database.`,
        error: err.toString()
      });
    })
})

module.exports = router;