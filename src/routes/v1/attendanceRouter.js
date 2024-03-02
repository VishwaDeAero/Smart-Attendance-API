const express = require('express');
const { studentOnly, protected } = require('../../middleware/auth');
const router = express.Router();

const {
    getAllAttendances,
    getOneAttendance,
    markAttendance,
    addAttendance,
    updateAttendance,
    deleteAttendance
} = require('../../controllers/attendanceController');

router.get("/", getAllAttendances);
router.get("/:attendanceId", getOneAttendance);
router.post("/", studentOnly, markAttendance);
router.post("/add", addAttendance);
router.patch("/:attendanceId", protected, updateAttendance);
router.delete("/:attendanceId", protected, deleteAttendance);

module.exports = router;