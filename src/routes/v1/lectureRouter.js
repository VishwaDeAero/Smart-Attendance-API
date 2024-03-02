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
router.post("/", protected(['lecturer']), createLecture);
router.patch("/:lectureId", protected(['lecturer']), updateLecture);
router.delete("/:lectureId", protected(['lecturer']), deleteLecture);

module.exports = router;