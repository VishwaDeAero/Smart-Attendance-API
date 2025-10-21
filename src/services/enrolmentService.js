const Enrolment = require("../models/enrolmentModel");
const Student = require("../models/studentModel");
const Subject = require("../models/subjectModel");
// Define associations
Enrolment.belongsTo(Subject);
Enrolment.belongsTo(Student);

const createEnrolment = (newEnrolment) => {
    return new Promise((resolve, reject) => {
        Enrolment.create(newEnrolment)
            .then((enrolment) => {
                resolve(enrolment); // Resolve the Promise with the result
            })
            .catch((error) => {
                reject(error); // Reject the Promise with an error if there's a problem
            });
    });
}

const getEnrolledSubjects = (studentId) => {
    return new Promise((resolve, reject) => {
        Enrolment.findAll({
            where: {
                studentId,
                deletedAt: null
            },
            include: [Subject],
        })
            .then((enrolments) => {
                resolve(enrolments); // Resolve the Promise with the result
            })
            .catch((error) => {
                reject(error); // Reject the Promise with an error if there's a problem
            });
    });
}

const getEnrolledStudents = (subjectId) => {
    return new Promise((resolve, reject) => {
        Enrolment.findAll({
            where: {
                subjectId,
                deletedAt: null
            },
            include: [Student],
        })
            .then((enrolments) => {
                resolve(enrolments); // Resolve the Promise with the result
            })
            .catch((error) => {
                reject(error); // Reject the Promise with an error if there's a problem
            });
    });
}

const deleteEnrolment = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find the enrolment by its ID
            const enrolment = await Enrolment.findByPk(id);

            if (!enrolment) {
                reject(new Error('Enrolment not found'));
                return;
            }

            // Update the enrolment with the new data
            // await enrolment.destroy();
            await enrolment.update({
                status: 0,
                deletedAt: Date.now()
            });

            // Resolve the Promise with the updated enrolment
            resolve(enrolment);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    createEnrolment,
    getEnrolledSubjects,
    getEnrolledStudents,
    deleteEnrolment
}