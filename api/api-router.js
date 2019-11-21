const router = require('express').Router();

const registerRouter = require('../routes/register-router');
const authRouter = require('../routes/auth-router');
const userRouter = require('../routes/user-router');
const testRouter = require("../routes/test-router");
const submissionsRouter = require('../routes/submission-router');
const answersRouter = require('../routes/answers-router');
const questionsRouter = require('../routes/questions-router');
const classesRouter = require("../routes/classes-router");

// all urls are prepended with /api
router.use('/register', registerRouter);
router.use('/login', authRouter);
router.use("/users", testRouter);
router.use('/users', userRouter);
router.use('/submissions', submissionsRouter);
router.use('/answers', answersRouter);
router.use('/questions', questionsRouter);
router.use("/classes", classesRouter);
// submissionsRouter
// classesRouter

router.get('/', (req, res) => {
  res.json({ api: 'You are connected to the API.' });
});


module.exports = router;
