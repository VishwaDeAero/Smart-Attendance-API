const Subject = require('../models/subjectModel')

const getAllSubjects = () => {
    return new Promise((resolve, reject) => {
        Subject.findAll()
          .then((subjects) => {
            resolve(subjects); // Resolve the Promise with the result
        })
          .catch((error) => {
            reject(error); // Reject the Promise with an error if there's a problem
        });
    });
}

const getOneSubject = (id) => {
    return new Promise((resolve, reject) => {
        Subject.findByPk(id)
          .then((subject) => {
            resolve(subject); // Resolve the Promise with the result
        })
          .catch((error) => {
            reject(error); // Reject the Promise with an error if there's a problem
        });
    });
}

const createSubject = (newSubject) => {
    return new Promise((resolve, reject) => {
        Subject.create(newSubject)
          .then((subject) => {
            resolve(subject); // Resolve the Promise with the result
        })
          .catch((error) => {
            reject(error); // Reject the Promise with an error if there's a problem
        });
    });
}

module.exports = {
    getAllSubjects,
    getOneSubject,
    createSubject
}