const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../models/users-model');

const { getJwtToken } = require('../helpers/jwt-helpers');

router.post('/', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .then(user => {
      // console.log(`user in findBy in login POST req`, user)
      if (!user) {
        res.status(401).json({
          message: 'User does not exist, check username and try again.'
        })
      } else if (user && bcrypt.compareSync(password, user.password)) {
        const token = getJwtToken(user)
        res.status(200).json({
          message: `Welcome, ${user.first_name} ${user.last_name}!`,
          token
        });
      } else {
        res.status(401).json({ message: `User provided incorrect password.` })
      }
    })
    .catch(err => {
      res.status(500).json({ message: `Server encountered error when retrieving user from database -- refer to error for details.`, error: err.toString() })
    })
})





module.exports = router