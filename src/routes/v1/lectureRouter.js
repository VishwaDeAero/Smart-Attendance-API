const express = require('express');
const router = express.Router();

const {
    getAllLectures,
    getOneLecture,
    createLecture,
    updateLecture,
    deleteLecture 
} = require('../../controllers/lectureController');

router.get("/", getAllLectures);
router.get("/:lectureId", getOneLecture);
router.post("/", createLecture);
router.patch("/:lectureId", updateLecture);
router.delete("/:lectureId", deleteLecture);

module.exports = router;