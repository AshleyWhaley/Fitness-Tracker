const router = require("express").Router();
const Workout = require("../models/Workout.js");

//Get workouts
router.get('/api/workouts', (req, res) => {
    Workout.find({})
        .sort({ day: 1 })
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.status(400).json(err)
        });
});

//Update workout
router.put('/api/workouts/:id', (req, res) => {
    Workout.updateOne(
        {
            _id: req.params.id
        },
        {
            $push: {
                exercises: req.body
            },
        },
        (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json(err);
            } else {
                res.json(data);
            }
        }
    );
});

//Add workout
router.post('/api/workouts', ({ body }, res) => {
    Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

//Get week of workouts
router.get('/api/workouts/range', (req, res) => {
    Workout.find({})
        .sort({ day: 1 })
        .limit(7)
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.status(400).json(err)
        });
});

module.exports = router;