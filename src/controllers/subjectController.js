const subjectService = require('../services/subjectService');

const getAllSubjects = (req, res) => {
    const AllSubjects = subjectService.getAllSubjects();
    res.send({
        status: "OK",
        data: AllSubjects,
    });
};

module.exports = {
    getAllSubjects,
}