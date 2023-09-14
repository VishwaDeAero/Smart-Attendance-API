const express = require('express');
const router = express.Router();

const {
    getAllStudents,
    getOneStudent,
    createStudent,
    updateStudent,
    deleteStudent 
} = require('../../controllers/studentController');

router.get("/", getAllStudents);
router.get("/:studentId", getOneStudent);
router.post("/", createStudent);
router.patch("/:studentId", updateStudent);
router.delete("/:studentId", deleteStudent);

module.exports = router;