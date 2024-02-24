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
        const { params: { subjectId } } = req;
        if (!subjectId) {
            return;
        }
        // Call the service function to get the subject by id
        const subject = await subjectService.getOneSubject(subjectId);
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
        const newSubject = {
            name: body.name,
            code: body.code,
            description: body.description,
        };
        // Call the service function to create a subject
        const subject = await subjectService.createSubject(newSubject);
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
        const { params: { subjectId } } = req;
        const { body } = req;
        if (!subjectId) {
            return;
        }
        const updatedData = {
            name: body.name,
            code: body.code,
            description: body.description,
            status: body.status,
        };
        // Call the service function to get the subject by id
        const subject = await subjectService.updateSubject(subjectId, updatedData);
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
        const { params: { subjectId } } = req;
        if (!subjectId) {
            return;
        }
        // Call the service function to get the subject by id
        const subject = await subjectService.deleteSubject(subjectId);
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