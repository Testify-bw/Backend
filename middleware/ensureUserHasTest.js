const testModel = require("../models/test-model.js");

module.exports = (req, res, next) => {
    const {sub, role} = req.decodedJwt

    testModel.findUserTestsById(sub)
    .then((tests) => {
        console.log(req.params.id, tests)

        if(role === "instructor" || tests.findIndex(test => test.id == req.params.id) > -1)
            next();
        else
            res.status(403).json({message: "user is not in a class with that test"})
    })
    .catch((error) => {
        res.status(500).json({
            message: "error getting user's tests"
        })
        console.log(error)
    });
}