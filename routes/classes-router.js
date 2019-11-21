const classesModel = require("../models/classes-model");

const classesRouter = require("express").Router();

classesRouter.get("/", (req, res) => {
    classesModel.get()
    .then(classes => res.status(200).json(classes))
    .catch(error => {
        console.log(error);
        res.status(500).json({message: "error fetching classes"})
    })
});

module.exports = classesRouter;