const express = require('express');
const { protected } = require('../../middleware/auth');
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
router.post("/", protected, createLecture);
router.patch("/:lectureId", protected, updateLecture);
router.delete("/:lectureId", protected, deleteLecture);

module.exports = router;