const jwt = require('jsonwebtoken');

module.exports = {
  getJwtToken
}

function getJwtToken(user) {
  const payload = {
    sub: user.id,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    role: user.role,
    iat: Date.now()
  };

  const secret = process.env.JWT_SECRET || "secret";

  const options = {
    expiresIn: "10h"
  };

  return jwt.sign(payload, secret, options);
}