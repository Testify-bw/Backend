const requireValidToken = require("../middleware/requireValidToken");
const router = require("express").Router();
const Questions = require("../models/questions-model");
const ensureUserHasTest = require("../middleware/ensureUserHasTest");



router.put('/:id', [requireValidToken, ensureUserHasTest], (req, res) => {
  const newQuestion = req.body;
  const id = req.params.id
  Questions.updateQuestion(id, newQuestion)
    .then(edit => {
      res.status(200).json(edit)
    })
    .catch(err => {
      res.status(500).json({
        message: `Error retrieving list of users from the database.`,
        error: err.toString()
      });
    })
});



router.delete('/:id', [requireValidToken, ensureUserHasTest], (req, res) => {
  const id = req.params.id
  Questions.remove(id)
    .then(edit => {
      res.status(200).json(edit)
    })
    .catch(err => {
      res.status(500).json({
        message: `Error retrieving list of users from the database.`,
        error: err.toString()
      });
    })
});

module.exports = router;