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

  Users.findBy({ id: id })
    .then(user => {
      if (!user) {
        res.status(404).json({ message: "no user found with that id" });
        return;
      }

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
    })
    .catch(() => res.status(500).json({ message: "could not get user information" }));
});

//set all classes user is enrolled in
router.put("/:id/classes", requireValidToken, (req, res) => {
  if (req.decodedJwt.role !== "instructor") {
    res.status(403).json({ message: "only instructors and add users to a class" });
    return;
  }

  Users.findBy({ id: req.params.id })
    .then(user => {
      if (!user) {
        res.status(404).json({ message: "no user found with that id" });
      } else if (!req.body.classes) {
        res.status(400).json({ message: "missing classes property" })
      } else {
        Users.removeUserClasses(req.params.id)
          .then(() => {
            Users.addUserClasses(req.params.id, req.body.classes)
              .then(() => {
                Users.getUserClasses(req.params.id)
                  .then(classes => {
                    res.status(200).json(classes);
                  })
                  .catch(err => {
                    console.log(err);
                    res.status(500).json({ message: "could not retrieve user's classes" });
                  });
              })
              .catch(err => {
                res.status(500).json({ message: "could not add user to classes" });
              });
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({ message: "could not remove user's existing classes" });
          })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "error retrieving user information" });
    })
});

router.get('/classes', requireValidToken, (req, res) => {
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
})

module.exports = router;
