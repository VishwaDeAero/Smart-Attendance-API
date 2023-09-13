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

const updateSubject = (id, updatedData) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find the subject by its ID
            const subject = await Subject.findByPk(id);
    
            if (!subject) {
            reject(new Error('Subject not found'));
            return;
            }
    
            // Update the subject with the new data
            await subject.update(updatedData);
    
            // Resolve the Promise with the updated subject
            resolve(subject);
        } catch (error) {
            reject(error);
        }
    });
}

const deleteSubject = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find the subject by its ID
            const subject = await Subject.findByPk(id);
    
            if (!subject) {
            reject(new Error('Subject not found'));
            return;
            }
    
            // Update the subject with the new data
            await subject.update({
                status: 0,
                deletedAt: Date.now()
            });
    
            // Resolve the Promise with the updated subject
            resolve(subject);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    getAllSubjects,
    getOneSubject,
    createSubject,
    updateSubject,
    deleteSubject
}