const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../models/users-model');
const { validateRegistration } = require('../helpers/register-helpers');

router.post('/', (req, res) => {
  let user = req.body;
  console.log(`user in POST api/register`, user);
  const validationResult = validateRegistration(user);

  if (validationResult.isSuccessful) {
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    Users.add(user)
      .then(user => {
        // console.log(`user in response from registration POST`, user)
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json({
          message: `Error adding the user to database.`,
          error: err.toString()
        })
      })
  } else {
    res.status(400).json({
      message: `${validationResult.errors.length} registration error(s) were encountered. See errors for details.`,
      errors: validationResult.errors
    })
  }


});

module.exports = router;