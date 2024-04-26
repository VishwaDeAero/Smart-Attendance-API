const express = require('express');
const { protected } = require('../../middleware/auth');
const router = express.Router();
const { getStudentAttendance } = require('../../controllers/reportController');

router.post("/student", protected(['Lecturer','Administrator']), getStudentAttendance);

module.exports = router;