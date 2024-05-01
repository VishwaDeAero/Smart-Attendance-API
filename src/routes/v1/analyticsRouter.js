const express = require('express');
const { protected } = require('../../middleware/auth');
const { getDailyAttendanceStats } = require('../../controllers/analyticsController');
const router = express.Router();

router.post("/dailystats", protected(['Lecturer','Administrator']), getDailyAttendanceStats);

module.exports = router;