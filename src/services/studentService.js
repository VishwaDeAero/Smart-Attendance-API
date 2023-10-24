const Student = require('../models/studentModel')

const getAllStudents = () => {
    return new Promise((resolve, reject) => {
        Student.findAll({
            // Removes Soft Deletes from View
            where: {
              deletedAt: null,
            },})
          .then((students) => {
            resolve(students); // Resolve the Promise with the result
        })
          .catch((error) => {
            reject(error); // Reject the Promise with an error if there's a problem
        });
    });
}

const getStudentByFaceIdToken = (faceIdToken) => {
    return new Promise((resolve, reject) => {
        Student.findOne({
            // Find by faceIdToken
            where: {
                faceIdToken: faceIdToken,
            },})
          .then((student) => {
            resolve(student); // Resolve the Promise with the result
        })
          .catch((error) => {
            reject(error); // Reject the Promise with an error if there's a problem
        });
    });
}

const getOneStudent = (id) => {
    return new Promise((resolve, reject) => {
        Student.findByPk(id)
          .then((student) => {
            resolve(student); // Resolve the Promise with the result
        })
          .catch((error) => {
            reject(error); // Reject the Promise with an error if there's a problem
        });
    });
}

const createStudent = (newStudent) => {
    return new Promise((resolve, reject) => {
        Student.create(newStudent)
          .then((student) => {
            resolve(student); // Resolve the Promise with the result
        })
          .catch((error) => {
            reject(error); // Reject the Promise with an error if there's a problem
        });
    });
}

const updateStudent = (id, updatedData) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find the Student by its ID
            const student = await Student.findByPk(id);
    
            if (!student) {
            reject(new Error('Student not found'));
            return;
            }
    
            // Update the Student with the new data
            await student.update(updatedData);
    
            // Resolve the Promise with the updated Student
            resolve(student);
        } catch (error) {
            reject(error);
        }
    });
}

const deleteStudent = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find the Student by its ID
            const student = await Student.findByPk(id);
    
            if (!student) {
            reject(new Error('Student not found'));
            return;
            }
    
            // Update the Student with the new data
            await student.update({
                status: 0,
                deletedAt: Date.now()
            });
    
            // Resolve the Promise with the updated Student
            resolve(student);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    getAllStudents,
    getStudentByFaceIdToken,
    getOneStudent,
    createStudent,
    updateStudent,
    deleteStudent
}