const requireValidToken = require("../middleware/requireValidToken");
const router = require("express").Router();
const Submissions = require("../models/submissions-model");
const ensureUserHasTest = require("../middleware/ensureUserHasTest");

// get all submissions
router.get('/', requireValidToken, (req, res) => {
  Submissions.get()
    .then(submissions => {
      res.status(200).json(submissions)
    })
    .catch(err => {
      res.status(500).json({
        message: `Error retrieving submissions from the database.`,
        error: err.toString()
      });
    })
});

// get submission and response by test_id
router.get('/:test_id', requireValidToken, (req, res) => {

  try {
    const { test_id } = req.params;
    const submission = Submissions.getByTest(test_id);
    submission.responses = Submissions.getResponsesBySubmission(submission.id)
      .then(sub => {
        res.status(200).json(sub)
      })
  } catch (err) {
    res.status(500).json({
      message: `Error retrieving submission from the database.`,
      error: err.toString()
    });
  }

})

// add student submission
router.post('/', requireValidToken, (req, res) => {
  const submission = req.body;
  Submissions.insertStudentSubmission(submission)
    .then(newSubmission => {
      res.status(200).json(newSubmission)
    })
    .catch(err => {
      res.status(500).json({
        message: `Error adding submission to the database.`,
        error: err.toString()
      });
    })
});

module.exports = router;