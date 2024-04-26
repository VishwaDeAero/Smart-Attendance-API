const Lecture = require('../models/lectureModel');
const Subject = require('../models/subjectModel');
const User = require('../models/userModel');

const getAllLectures = () => {
    return new Promise((resolve, reject) => {
        Lecture.findAll({
            // Removes Soft Deletes from View
            where: {
                deletedAt: null,
            },
            include: [Subject, User],
        })
            .then((lectures) => {
                resolve(lectures); // Resolve the Promise with the result
            })
            .catch((error) => {
                reject(error); // Reject the Promise with an error if there's a problem
            });
    });
}

const getAllLecturesBySubject = (subjectId) => {
    return new Promise((resolve, reject) => {
        Lecture.findAll({
            // Removes Soft Deletes from View
            where: {
                subjectId,
                deletedAt: null,
            },
            include: [Subject],
        })
            .then((lectures) => {
                resolve(lectures); // Resolve the Promise with the result
            })
            .catch((error) => {
                reject(error); // Reject the Promise with an error if there's a problem
            });
    });
}

const getOneLecture = (id) => {
    return new Promise((resolve, reject) => {
        Lecture.findByPk(id)
            .then((lecture) => {
                resolve(lecture); // Resolve the Promise with the result
            })
            .catch((error) => {
                reject(error); // Reject the Promise with an error if there's a problem
            });
    });
}

const createLecture = (newLecture) => {
    return new Promise((resolve, reject) => {
        Lecture.create(newLecture)
            .then((lecture) => {
                resolve(lecture); // Resolve the Promise with the result
            })
            .catch((error) => {
                reject(error); // Reject the Promise with an error if there's a problem
            });
    });
}

const updateLecture = (id, updatedData) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find the Lecture by its ID
            const lecture = await Lecture.findByPk(id);

            if (!lecture) {
                reject(new Error('Lecture not found'));
                return;
            }

            // Update the Lecture with the new data
            await lecture.update(updatedData);

            // Resolve the Promise with the updated Lecture
            resolve(lecture);
        } catch (error) {
            reject(error);
        }
    });
}

const deleteLecture = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find the Lecture by its ID
            const lecture = await Lecture.findByPk(id);

            if (!lecture) {
                reject(new Error('Lecture not found'));
                return;
            }

            // Update the Lecture with the new data
            await lecture.update({
                status: 0,
                deletedAt: Date.now()
            });

            // Resolve the Promise with the updated Lecture
            resolve(lecture);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    getAllLectures,
    getOneLecture,
    getAllLecturesBySubject,
    createLecture,
    updateLecture,
    deleteLecture
}