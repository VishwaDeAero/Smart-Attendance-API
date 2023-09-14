const studentService = require('../services/studentService');

const getAllStudents = async (req, res) => {
    try {
        // Call the service function to get all Students
        const students = await studentService.getAllStudents();
        // Handle the data (Students) and send a response
        res.status(200).json({
            status: 'OK',
            data: students
        });
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

const getOneStudent = async (req, res) => {
    try {
        const { params: { studentId } } = req;
        if (!studentId) {
            return;
        }
        // Call the service function to get the Student by id
        const student = await studentService.getOneStudent(studentId);
        // Handle the data (Student) and send a response
        res.status(200).json({
            status: 'OK',
            data: student
        });
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

const createStudent = async (req, res) => {
    try {
        const { body } = req;
        const newStudent = {
            name: body.name,
            indexNo: body.indexNo,
            faceIdToken: body.faceIdToken,
        };
        // Call the service function to create a Student
        const student = await studentService.createStudent(newStudent);
        // Handle the data (Student) and send a response
        res.status(200).json({
            status: 'OK',
            data: student
        });
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

const updateStudent = async (req, res) => {
    try {
        const { params: { studentId } } = req;
        const { body } = req;
        if (!studentId) {
            return;
        }
        const updatedData = {
            name: body.name,
            indexNo: body.indexNo,
            faceIdToken: body.faceIdToken,
        };
        // Call the service function to get the Student by id
        const student = await studentService.updateStudent(studentId, updatedData);
        // Handle the data (Student) and send a response
        res.status(200).json({
            status: 'OK',
            data: student
        });
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const { params: { studentId } } = req;
        if (!studentId) {
            return;
        }
        // Call the service function to get the Student by id
        const student = await studentService.deleteStudent(studentId);
        // Handle the data (Student) and send a response
        res.status(200).json({
            status: 'OK',
            data: student
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
    getAllStudents,
    getOneStudent,
    createStudent,
    updateStudent,
    deleteStudent
}