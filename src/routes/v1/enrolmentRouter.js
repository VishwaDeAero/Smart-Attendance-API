const express = require('express');
const { protected } = require('../../middleware/auth');
const router = express.Router();


const { 
    getEnrolmentsByStudent,
    createEnrolment,
    deleteEnrolment,
} = require('../../controllers/enrolmentController');

router.get("/:studentId", protected(['Lecturer','Administrator']), getEnrolmentsByStudent);
router.post("/", protected(['Lecturer','Administrator']), createEnrolment);
router.delete("/:enrollId", protected(['Lecturer','Administrator']), deleteEnrolment);

module.exports = router;