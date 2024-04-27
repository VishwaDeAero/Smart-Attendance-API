const express = require('express');
const { protected } = require('../../middleware/auth');
const router = express.Router();
const { getStudentAttendance, getLectureAttendance } = require('../../controllers/reportController');

router.post("/student", protected(['Lecturer','Administrator']), getStudentAttendance);
router.post("/lecture", protected(['Lecturer','Administrator']), getLectureAttendance);

module.exports = router;