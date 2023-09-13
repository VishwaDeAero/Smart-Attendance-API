const express = require('express');
const router = express.Router();

const {getAllSubjects, getOneSubject} = require('../../controllers/subjectController');

router.get("/", getAllSubjects);
router.get("/:workoutId", getOneSubject);
  
module.exports = router;