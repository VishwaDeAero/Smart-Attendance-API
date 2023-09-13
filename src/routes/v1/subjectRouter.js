const express = require('express');
const router = express.Router();

const {
    getAllSubjects,
    getOneSubject,
    createSubject,
    updateSubject,
    deleteSubject 
} = require('../../controllers/subjectController');

router.get("/", getAllSubjects);
router.get("/:workoutId", getOneSubject);
router.post("/", createSubject);
router.patch("/:workoutId", updateSubject);
router.delete("/:workoutId", deleteSubject);

module.exports = router;