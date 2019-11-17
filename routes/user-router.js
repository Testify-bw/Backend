// routes for logged-in users

const router = require('express').Router();

const Users = require('../models/users-model');
const requireValidToken = require('../middleware/requireValidToken');


// get all users
router.get('/', requireValidToken, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({
        message: `Error retrieving list of users from the database.`,
        error: err.toString()
      });
    });
});

// get users by role
router.get('/:role', requireValidToken, (req, res) => {
  let role = req.params.role;
  console.log(`getting users by role`, role)
  Users.findAllBy({ role })
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({
        message: `Error retrieving list of users from the database.`,
        error: err.toString()
      });
    });
});

module.exports = router;
