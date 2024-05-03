const lectureService = require('../services/lectureService');
const enrolmentService = require('../services/enrolmentService');
const jwt = require('jsonwebtoken');

const getAllLectures = async (req, res) => {
    try {
        // Call the service function to get all Lectures
        const lectures = await lectureService.getAllLectures();
        // Handle the data (Lectures) and send a response
        res.status(200).json({
            status: 'OK',
            data: lectures
        });
    } catch (error) {
        // Handle errors and send an error response
        console.log("LectureController:", error);
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

const getAllUpcomingLectures = async (req, res) => {
    try {
        const studentId = req.student.id;
        console.log("Student Id:",studentId)

        //Enrolled Subjects
        const enrolments = await  enrolmentService.getEnrolledSubjects(studentId);

        // Get lectures of student's subject
        const enrolmentsData = await Promise.all(enrolments.map(async enrolment => {
            const subjectLectures = await lectureService.getAllLecturesBySubject(enrolment.subjectId);
            return subjectLectures;
        }));
        const lectures = enrolmentsData.flat();

        // Filter Lecture Attendance by Date
        const upcomingLectures = lectures.filter(lecture => {
            const scheduledAt = new Date(lecture.dataValues.scheduledAt);
            return scheduledAt > new Date();
        });

        // Handle the data (Lectures) and send a response
        res.status(200).json({
            status: 'OK',
            data: upcomingLectures
        });
    } catch (error) {
        // Handle errors and send an error response
        console.log("LectureController:", error);
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

const getOneLecture = async (req, res) => {
    try {
        const { params: { lectureId } } = req;
        if (!lectureId) {
            return;
        }
        // Call the service function to get the Lecture by id
        const lecture = await lectureService.getOneLecture(lectureId);
        // Handle the data (Lecture) and send a response
        res.status(200).json({
            status: 'OK',
            data: lecture
        });
    } catch (error) {
        // Handle errors and send an error response
        console.log("LectureController:", error);
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

const getLectureBySubject = async (req, res) => {
    try {
        const { params: { subjectId } } = req;
        if (!subjectId) {
            return;
        }
        // Call the service function to get the Lecture by id
        const lectures = await lectureService.getAllLecturesBySubject(subjectId);
        // Handle the data (Lecture) and send a response
        res.status(200).json({
            status: 'OK',
            data: lectures
        });
    } catch (error) {
        // Handle errors and send an error response
        console.log("LectureController:", error);
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

const generateLectureQR = async (req, res) => {
    try {
        const { params: { lectureId } } = req;
        if (!lectureId) {
            return;
        }
        // Generate QR token with the Lecture by id
        const secretKey = process.env.SECRET_KEY;
        const qrToken = jwt.sign({
            id: lectureId,
        }, secretKey, { expiresIn: 900 }); //900 = 15 min
        // Handle the data (Lecture) and send a response
        res.status(200).json({
            status: 'OK',
            data: qrToken
        });
    } catch (error) {
        // Handle errors and send an error response
        console.log("LectureController:", error);
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

const createLecture = async (req, res) => {
    try {
        const { body } = req;
        const newLecture = {
            subjectId: body.subjectId,
            scheduledAt: body.scheduledAt,
            duration: body.duration,
            location: body.location,
            lecturerId: body.lecturerId,
        };
        // Call the service function to create a Lecture
        const lecture = await lectureService.createLecture(newLecture);
        // Handle the data (Lecture) and send a response
        res.status(200).json({
            status: 'OK',
            data: lecture
        });
    } catch (error) {
        // Handle errors and send an error response
        console.log("LectureController:", error);
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

const updateLecture = async (req, res) => {
    try {
        const { params: { lectureId } } = req;
        const { body } = req;
        if (!lectureId) {
            return;
        }
        const updatedData = {
            subjectId: body.subjectId,
            scheduledAt: body.scheduledAt,
            duration: body.duration,
            location: body.location,
            lecturerId: body.lecturerId,
            status: body.status,
        };
        // Call the service function to get the Lecture by id
        const lecture = await lectureService.updateLecture(lectureId, updatedData);
        // Handle the data (Lecture) and send a response
        res.status(200).json({
            status: 'OK',
            data: lecture
        });
    } catch (error) {
        // Handle errors and send an error response
        console.log("LectureController:", error);
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

const deleteLecture = async (req, res) => {
    try {
        const { params: { lectureId } } = req;
        if (!lectureId) {
            return;
        }
        // Call the service function to get the Lecture by id
        const lecture = await lectureService.deleteLecture(lectureId);
        // Handle the data (Lecture) and send a response
        res.status(200).json({
            status: 'OK',
            data: lecture
        });
    } catch (error) {
        // Handle errors and send an error response
        console.log("LectureController:", error);
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

module.exports = {
    getAllLectures,
    getAllUpcomingLectures,
    getOneLecture,
    getLectureBySubject,
    generateLectureQR,
    createLecture,
    updateLecture,
    deleteLecture
}