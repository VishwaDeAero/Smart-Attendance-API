const express = require('express');
const { protected } = require('../../middleware/auth');
const router = express.Router();
const { getStudentAttendance, getLectureAttendance, getSubjectAttendance } = require('../../controllers/reportController');

router.post("/student", protected(['Lecturer','Administrator']), getStudentAttendance);
router.post("/lecture", protected(['Lecturer','Administrator']), getLectureAttendance);
router.post("/subject", protected(['Lecturer','Administrator']), getSubjectAttendance);

module.exports = router;