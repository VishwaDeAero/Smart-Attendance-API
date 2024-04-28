const EnrolmentService = require('../services/enrolmentService');

const createEnrolment = async (req, res) => {
    try {
        const { body } = req;
        const newEnrolment = {
            studentId: body.studentId,
            subjectId: body.subjectId,
        };
        // Call the service function to create a Enrolment
        const enrolment = await EnrolmentService.createEnrolment(newEnrolment);
        // Handle the data (enrolment) and send a response
        res.status(200).json({
            status: 'OK',
            data: enrolment
        });
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

const getEnrolmentsByStudent = async (req, res) => {
    try {
        const { params: { studentId } } = req;
        if (!studentId) {
            return;
        }
        // Call the service function to get all enrolments
        const subjects = await EnrolmentService.getEnrolledSubjects(studentId)
        // Handle the data (enrolments) and send a response
        res.status(200).json({
            status: 'OK',
            data: subjects
        });
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

const deleteEnrolment = async (req, res) => {
    try {
        const { params: { enrollId } } = req;
        if (!enrollId) {
            return;
        }
        // Call the service function to get the Lecture by id
        const enrolment = await EnrolmentService.deleteEnrolment(enrollId);
        // Handle the data (Lecture) and send a response
        res.status(200).json({
            status: 'OK',
            data: enrolment
        });
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

module.exports = {
    createEnrolment,
    getEnrolmentsByStudent,
    deleteEnrolment,
}