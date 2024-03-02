const LectureService = require('../services/lectureService');
const jwt = require('jsonwebtoken');

const getAllLectures = async (req, res) => {
    try {
        // Call the service function to get all Lectures
        const lectures = await LectureService.getAllLectures();
        // Handle the data (Lectures) and send a response
        res.status(200).json({
            status: 'OK',
            data: lectures
        });
    } catch (error) {
        // Handle errors and send an error response
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
        const lecture = await LectureService.getOneLecture(lectureId);
        // Handle the data (Lecture) and send a response
        res.status(200).json({
            status: 'OK',
            data: lecture
        });
    } catch (error) {
        // Handle errors and send an error response
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
            tokenQR: body.tokenQR,
            lecturer: body.lecturer,
        };
        // Call the service function to create a Lecture
        const lecture = await LectureService.createLecture(newLecture);
        // Handle the data (Lecture) and send a response
        res.status(200).json({
            status: 'OK',
            data: lecture
        });
    } catch (error) {
        // Handle errors and send an error response
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
            tokenQR: body.tokenQR,
            lecturer: body.lecturer,
            status: body.status,
        };
        // Call the service function to get the Lecture by id
        const lecture = await LectureService.updateLecture(lectureId, updatedData);
        // Handle the data (Lecture) and send a response
        res.status(200).json({
            status: 'OK',
            data: lecture
        });
    } catch (error) {
        // Handle errors and send an error response
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
        const lecture = await LectureService.deleteLecture(lectureId);
        // Handle the data (Lecture) and send a response
        res.status(200).json({
            status: 'OK',
            data: lecture
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
    getAllLectures,
    getOneLecture,
    generateLectureQR,
    createLecture,
    updateLecture,
    deleteLecture
}