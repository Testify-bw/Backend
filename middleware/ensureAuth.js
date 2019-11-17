const Users = require('../users/users-model');
const bcrypt = require('bcryptjs');

module.exports = {
  ensureAuth
}


function ensureAuth(url, req, res, next) {

  if (req.url === `${url}` && username && password) {
    const { username, password } = req.headers;
    Users.findBy({ username })
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {

          next();
        } else {
          res.status(401).json({ message: 'User not logged in.' });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      })
  } else res.status(400).json({ message: 'Please provide credentials.' })
}
