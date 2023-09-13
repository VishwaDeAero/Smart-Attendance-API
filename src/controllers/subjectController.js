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

module.exports = {
    getAllSubjects,
}