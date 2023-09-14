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
router.get("/:subjectId", getOneSubject);
router.post("/", createSubject);
router.patch("/:subjectId", updateSubject);
router.delete("/:subjectId", deleteSubject);

module.exports = router;