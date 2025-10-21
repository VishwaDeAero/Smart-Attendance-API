const express = require('express');
const { protected, studentOnly } = require('../../middleware/auth');
const router = express.Router();

const {
    getAllLectures,
    getOneLecture,
    getLectureBySubject,
    generateLectureQR,
    createLecture,
    updateLecture,
    deleteLecture, 
    getAllUpcomingLectures
} = require('../../controllers/lectureController');

router.get("/", getAllLectures);
router.get("/upcoming", studentOnly, getAllUpcomingLectures);
router.get("/:lectureId", getOneLecture);
router.get("/subject/:subjectId", getLectureBySubject);
router.get("/qrtoken/:lectureId", generateLectureQR);
router.post("/", createLecture);
router.patch("/:lectureId", updateLecture);
router.delete("/:lectureId", deleteLecture);
// router.post("/", protected(['lecturer']), createLecture);
// router.patch("/:lectureId", protected(['lecturer']), updateLecture);
// router.delete("/:lectureId", protected(['lecturer']), deleteLecture);

module.exports = router;