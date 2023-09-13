const subjectService = require('../services/subjectService');

const getAllSubjects = async (req, res) => {
    try {
        // Call the service function to get all subjects
        const subjects = await subjectService.getAllSubjects();
        // Handle the data (subjects) and send a response
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

const getOneSubject = async (req, res) => {
    try {
        const { params: { workoutId } } = req;
        if (!workoutId) {
            return;
        }
        // Call the service function to get the subject by id
        const subject = await subjectService.getOneSubject(workoutId);
        // Handle the data (subject) and send a response
        res.status(200).json({
            status: 'OK',
            data: subject
        });
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

const createSubject = async (req, res) => {
    try {
        const { body } = req;
        const newSubjectt = {
            name: body.name,
            code: body.code,
            description: body.description,
        };
        // Call the service function to create a subject
        const subject = await subjectService.createSubject(newSubjectt);
        // Handle the data (subject) and send a response
        res.status(200).json({
            status: 'OK',
            data: subject
        });
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

const updateSubject = async (req, res) => {
    try {
        const { params: { workoutId } } = req;
        if (!workoutId) {
            return;
        }
        // Call the service function to get the subject by id
        const subject = await subjectService.getOneSubject(workoutId);
        // Handle the data (subject) and send a response
        res.status(200).json({
            status: 'OK',
            data: subject
        });
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

const deleteSubject = async (req, res) => {
    try {
        const { params: { workoutId } } = req;
        if (!workoutId) {
            return;
        }
        // Call the service function to get the subject by id
        const subject = await subjectService.getOneSubject(workoutId);
        // Handle the data (subject) and send a response
        res.status(200).json({
            status: 'OK',
            data: subject
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
    getAllSubjects,
    getOneSubject,
    createSubject,
    updateSubject,
    deleteSubject
}