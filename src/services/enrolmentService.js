const Enrolment = require("../models/enrolmentModel");
const Student = require("../models/studentModel");
const Subject = require("../models/subjectModel");
// Define associations
Enrolment.belongsTo(Subject);

const getEnrolledSubjects = (studentId) => {
    return new Promise((resolve, reject) => {
        Enrolment.findAll({
            where: {
                studentId,
                deletedAt: null
            },
            // include: [Subject],
        })
            .then((enrolments) => {
                resolve(enrolments); // Resolve the Promise with the result
            })
            .catch((error) => {
                reject(error); // Reject the Promise with an error if there's a problem
            });
    });
}

module.exports = {
    getEnrolledSubjects
}