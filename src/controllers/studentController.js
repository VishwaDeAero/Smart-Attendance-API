const studentService = require('../services/studentService');
const jwt = require('jsonwebtoken');

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

const loginStudent = async (req, res) => {
    try {
        const { body } = req;
        const currentFace = body.faceIdToken;

        var students = await studentService.getAllStudentsFaceIds();
        let studentData = students.map(student => {
            return {
                id: student.id,
                faceIdToken: atob(student.faceIdToken)
            };
        });

        let results = calculateEuclideanDistance(studentData, currentFace);
        console.log("results", results)

        // Call the service function to get the student by faceIdToken
        if(results.distance <= 0.3){
            console.log("HIT")
            const student = await studentService.getOneStudent(results.id);

            // Handle the data (student) and send a response
            const secretKey = process.env.STUDENT_SECRET_KEY;
            const token = jwt.sign({
                id: student.id,
                name: student.name, 
                indexNo: student.indexNo,
            }, secretKey, { expiresIn: '1h' });
            res.status(200).json({
                status: 'OK',
                face_difference: results.distance,
                token: token,
                data: student
            });
        }else{
            res.status(200).json({
                status: 'FAIL',
                error: 'No Matching Students Found'
            });
        }
    } catch (error) {
        // Handle errors and send an error response
        console.log(error)
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

function calculateEuclideanDistance(studentData, faceData) {
    let emb = JSON.parse(faceData);
    let minDistance = -5;
    let closestId = null;

    for (const item of studentData) {
        const knownEmb = item.faceIdToken.split(',').map(parseFloat);
        let distance = 0;
        for (let i = 0; i < emb.length; i++) {
            const diff = emb[i] - knownEmb[i];
            distance += diff * diff;
        }
        distance = Math.sqrt(distance);

        if (minDistance == -5 || distance < minDistance) {
            minDistance = distance;
            closestId = item.id;
        }
    }

    return { id: closestId, distance: minDistance };
}

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
        let faceIdToken = btoa(body.faceIdToken);
        const newStudent = {
            name: body.name,
            indexNo: body.indexNo,
            faceIdToken: faceIdToken,
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
            status: body.status
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
    loginStudent,
    getOneStudent,
    createStudent,
    updateStudent,
    deleteStudent
}