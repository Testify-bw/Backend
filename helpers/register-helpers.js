module.exports = {
  validateRegistration
}

const validRoles = [`student`, `instructor`];

function validateRegistration(user) {
  let errors = [];

  // add test to push error when username has space

  if (!user.username || user.username.length < 4) {

    errors.push(`Username must be longer than 4 characters`)
  }
  if (!user.password || user.password.length < 6) {

    errors.push(`Password must be longer than 6 characters.`)
  }
  if (!validRoles.includes(user.role)) {

    errors.push(`Role must be 'student' or 'instructor'`)
  }

  return {
    isSuccessful: errors.length > 0 ? false : true,
    errors
  }
};

