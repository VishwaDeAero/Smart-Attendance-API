const express = require('express');
const { protected } = require('../../middleware/auth');
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
router.post("/", protected, createSubject);
router.patch("/:subjectId", protected, updateSubject);
router.delete("/:subjectId", protected, deleteSubject);

module.exports = router;