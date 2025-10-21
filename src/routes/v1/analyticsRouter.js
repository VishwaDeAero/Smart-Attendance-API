const express = require('express');
const { protected } = require('../../middleware/auth');
const { getDailyAttendanceStats, getAttendanceStats } = require('../../controllers/analyticsController');
const router = express.Router();

router.post("/dailystats", protected(['Lecturer','Administrator']), getDailyAttendanceStats);
router.post("/stats", protected(['Lecturer','Administrator']), getAttendanceStats);

module.exports = router;