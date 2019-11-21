// routes for logged-in users

const router = require('express').Router();

const Users = require('../models/users-model');
const classesModel = require("../models/classes-model");
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
router.get('/roles/:role', requireValidToken, (req, res) => {
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

router.get('/:id/classes', requireValidToken, (req, res) => {
  const { id } = req.params;
  Users.getUserClasses(id)
    .then(classes => {
      res.status(200).json(classes)
    })
    .catch(err => {
      res.status(500).json({
        message: `Error retrieving list of classes from the database.`,
        error: err.toString()
      });
    })
});

//add user to class
router.post("/:id/classes", requireValidToken, (req, res) => {
  if(req.decodedJwt.role !== "instructor") {
    res.status(403).json({message: "only instructors and add users to a class"});
    return;
  }

  Users.findBy({id: req.params.id})
  .then(user => {
    res.status(200).json(user);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: "error retrieving user information"});
  })
});

module.exports = router;
