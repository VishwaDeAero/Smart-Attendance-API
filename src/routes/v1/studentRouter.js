const express = require('express');
const { protected } = require('../../middleware/auth');
const router = express.Router();

const {
    getAllStudents,
    loginStudent,
    getOneStudent,
    createStudent,
    updateStudent,
    deleteStudent 
} = require('../../controllers/studentController');

router.get("/", getAllStudents);
router.get("/:studentId", getOneStudent);
router.post("/login/", loginStudent);
// router.post("/", protected, createStudent);
// router.patch("/:studentId", protected, updateStudent);
// router.delete("/:studentId", protected, deleteStudent);
router.post("/", createStudent);
router.patch("/:studentId", updateStudent);
router.delete("/:studentId", deleteStudent);

module.exports = router;