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

module.exports = {
    getAllSubjects,
}