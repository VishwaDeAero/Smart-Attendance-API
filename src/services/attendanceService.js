const Attendance = require('../models/attendanceModel');
const Lecture = require('../models/lectureModel');
const Student = require('../models/studentModel');
const Subject = require('../models/subjectModel');

const getAllAttendances = () => {
    return new Promise((resolve, reject) => {
        Attendance.findAll({
            include: [
                { model: Student },
                { model: Lecture, include: [{ model: Subject }] }
            ],
        })
            .then((attendances) => {
                resolve(attendances); // Resolve the Promise with the result
            })
            .catch((error) => {
                reject(error); // Reject the Promise with an error if there's a problem
            });
    });
}

const getOneAttendance = (id) => {
    return new Promise((resolve, reject) => {
        Attendance.findByPk(id)
            .then((attendance) => {
                resolve(attendance); // Resolve the Promise with the result
            })
            .catch((error) => {
                reject(error); // Reject the Promise with an error if there's a problem
            });
    });
}

const getAttendanceByStudentLecture = (studentId, lectureId) => {
    return new Promise((resolve, reject) => {
        Attendance.findOne({
            where: { studentId, lectureId }
        })
            .then((attendance) => {
                resolve(attendance); // Resolve the Promise with the result
            })
            .catch((error) => {
                reject(error); // Reject the Promise with an error if there's a problem
            });
    });
}

const createAttendance = (newAttendance) => {
    return new Promise((resolve, reject) => {
        Attendance.create(newAttendance)
            .then((attendance) => {
                resolve(attendance); // Resolve the Promise with the result
            })
            .catch((error) => {
                reject(error); // Reject the Promise with an error if there's a problem
            });
    });
}

const updateAttendance = (id, updatedData) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find the Attendance by its ID
            const attendance = await Attendance.findByPk(id);

            if (!attendance) {
                reject(new Error('Attendance not found'));
                return;
            }

            // Update the Attendance with the new data
            await attendance.update(updatedData);

            // Resolve the Promise with the updated Attendance
            resolve(attendance);
        } catch (error) {
            reject(error);
        }
    });
}

const deleteAttendance = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find the Attendance by its ID
            const attendance = await Attendance.findByPk(id);

            if (!attendance) {
                reject(new Error('Attendance not found'));
                return;
            }

            // Soft delete attendance
            await attendance.update({
                status: 0,
                deletedAt: Date.now()
            });

            // Resolve the Promise with the updated Attendance
            resolve(attendance);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    getAllAttendances,
    getOneAttendance,
    getAttendanceByStudentLecture,
    createAttendance,
    updateAttendance,
    deleteAttendance
}