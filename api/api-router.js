const router = require('express').Router();

const registerRouter = require('../routes/register-router');
const authRouter = require('../routes/auth-router');
const userRouter = require('../routes/user-router');
// all urls are prepended with /api
router.use('/register', registerRouter);
router.use('/login', authRouter)


router.get('/', (req, res) => {
  res.json({ api: 'You are connected to the API.' })
});


module.exports = router;