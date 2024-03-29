const router = require("express").Router();
let Exercise = require("../models/exercise.model");

// gets all
router.route("/").get((request, response) => {
  Exercise.find()
    .then((exercises) => response.json(exercises))
    .catch((err) => response.status(400).json("Error: " + err));
});

// creates or post an exercise
router.route("/add").post((request, response) => {
  const username = request.body.username;
  const description = request.body.description;
  const duration = Number(request.body.duration);
  const date = Date.parse(request.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise
    .save()
    .then(() => response.json("Exercise added!"))
    .catch((err) => response.status(400).json("Error: " + err));
});

// gets one exercise using id
router.route("/:id").get((request, response) => {
  Exercise.findById(request.params.id)
    .then((exercise) => console.log(response.json(exercise)))
    .catch((err) => response.status(400).json("Error: " + err));
});

// deletes one exercise using id
router.route("/:id").delete((request, response) => {
  Exercise.findByIdAndDelete(request.params.id)
    .then(() => response.json("Exercise deleted"))
    .catch((err) => response.status(400).json("Error: " + err));
});

// updates exercise
router.route("/update/:id").post((request, response) => {
  Exercise.findById(request.params.id)
    .then((exercise) => {
      exercise.username = request.body.username;
      exercise.description = request.body.description;
      exercise.duration = Number(request.body.duration);
      exercise.date = Date.parse(request.body.date);

      exercise
        .save()
        .then(() => response.json("Exercise updated!"))
        .catch((err) => response.status(400).json("Error: " + err));
    })
    .catch((err) => response.status(400).json("Error: " + err));
});

module.exports = router;
