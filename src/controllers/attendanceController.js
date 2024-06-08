const enrolmentService = require('../services/enrolmentService');
const lectureService = require('../services/lectureService');
const attendanceService = require('../services/attendanceService')
const moment = require('moment')
const jwt = require('jsonwebtoken');

const getAllAttendances = async (req, res) => {
    try {
        // Call the service function to get all attendances
        const attendances = await attendanceService.getAllAttendances()
        // Handle the data (attendances) and send a response
        res.status(200).json({
            status: 'OK',
            data: attendances
        })
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({
            error: 'Internal server error',
            details: error
        })
    }
}

const getStudentAttendance = async (req, res) => {
    try {
        const { body } = req;
        const studentId = req.student.id;
        const startDate = (body.startDate) ? new Date(body.startDate) : new Date(0);
        const endDate = (body.endDate) ? new Date(body.endDate) : new Date();

        // Get student enrolled subjects
        let enrolments = await enrolmentService.getEnrolledSubjects(studentId);
        // Get lectures of student's subject
        const enrolmentsData = await Promise.all(enrolments.map(async enrolment => {
            const subjectLectures = await lectureService.getAllLecturesBySubject(enrolment.subjectId);
            return subjectLectures;
        }));
        const lectures = enrolmentsData.flat();

        // Get attenedance of student
        const attendances = await Promise.all(lectures.map(async (lecture) => {
            const attendance = await attendanceService.getAttendanceByStudentLecture(studentId, lecture.id);
            lecture.dataValues.attendedAt = (attendance) ? attendance.attendedAt : null;
            return lecture; // Return the modified lecture object
        }));

        // Filter Lecture Attendance by Date
        const filteredAttendances = attendances.filter(lecture => {
            const scheduledAt = new Date(lecture.dataValues.scheduledAt);
            return scheduledAt > startDate && scheduledAt <= endDate;
        });


        res.status(200).json({
            status: 'OK',
            data: filteredAttendances
        });
    } catch (error) {
        // Handle errors and send an error response
        console.log(error)
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

const getOneAttendance = async (req, res) => {
    try {
        const { params: { attendanceId } } = req
        if (!attendanceId) {
            return
        }
        // Call the service function to get the Attendance by id
        const attendance = await attendanceService.getOneAttendance(attendanceId)
        // Handle the data (Attendance) and send a response
        res.status(200).json({
            status: 'OK',
            data: attendance
        })
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({
            error: 'Internal server error',
            details: error
        })
    }
}

const markAttendance = async (req, res) => {
    try {
        const secretKey = process.env.SECRET_KEY;
        const { body } = req
        const lectureToken = body.lectureToken;
        const studentId = (req.student.id) ? req.student.id : null;
        var lectureId = null;
        const attendedAt = moment();

        jwt.verify(lectureToken, secretKey, (err, decoded) => {
            if (err) {
                console.log('Lecture Token Error', err)
                return res.status(401).json({
                    error: 'Lecture Token is not valid',
                    details: err
                });
            }
            lectureId = decoded.id;
        });

        // check Attendance duplicates
        const duplicates = await attendanceService.getAttendanceByStudentLecture(studentId, lectureId);
        if (duplicates) {
            return res.status(200).json({
                status: 'FAIL',
                details: 'Attendance Already Marked',
                data: duplicates,
            });
        }

        const lectureDetails = await lectureService.getOneLecture(lectureId);
        // check Date validation
        if (lectureDetails) {
            const scheduledAt = moment(lectureDetails.dataValues.scheduledAt);
            const duration = parseFloat(lectureDetails.dataValues.duration); // Duration in hours

            // Calculate the start time and end time based on scheduledAt and duration
            const startTime = scheduledAt.clone().subtract(1, 'hour'); // One hour before scheduledAt
            const endTime = scheduledAt.clone().add(duration, 'hours'); // Duration hours after scheduledAt

            // Check if the current datetime is within the specified range
            if (!attendedAt.isBetween(startTime, endTime)) {
                return res.status(200).json({
                    status: 'FAIL',
                    details: 'Attendance is not within the lecture time',
                    data: lectureDetails,
                });
            }
        }

        // Validation of Enrolled Subject Lectures
        const enrolledSubjects = await enrolmentService.getEnrolledSubjects(studentId);
        if (enrolledSubjects) {
            const subjectList = enrolledSubjects.map((subject) => {
                return subject.dataValues.subjectId;
            });
            if (!subjectList.includes(lectureDetails.dataValues.subjectId)) {
                return res.status(200).json({
                    status: 'FAIL',
                    details: 'You are not enrolled for this Lecture',
                    data: lectureDetails,
                });
            }
        }

        const newAttendance = {
            studentId: req.student.id,
            lectureId: lectureId,
            deviceData: 'body.deviceData',
            attendedAt: moment()
        }
        // Call the service function to mark attendance
        const attendance = await attendanceService.createAttendance(newAttendance)
        // Handle the data (attendance) and send a response
        res.status(200).json({
            status: 'OK',
            data: attendance,
        })
    } catch (error) {
        // Handle errors and send an error response
        console.log("Server Error", error)
        res.status(500).json({
            error: 'Internal server error',
            details: error
        })
    }
}

const addAttendance = async (req, res) => {
    try {
        const { body } = req
        const newAttendance = {
            studentId: body.studentId,
            lectureId: body.lectureId,
            deviceData: 'Admin Account',
            attendedAt: moment(body.attendedAt)
        }

        // check Attendance duplicates
        const duplicates = await attendanceService.getAttendanceByStudentLecture(newAttendance.studentId, newAttendance.lectureId);
        if (duplicates) {
            return res.status(200).json({
                status: 'FAIL',
                details: 'Attendance Already Marked',
                data: duplicates,
            });
        }

        const lectureDetails = await lectureService.getOneLecture(newAttendance.lectureId);
        // check Date validation
        if (lectureDetails) {
            const scheduledAt = moment(lectureDetails.dataValues.scheduledAt);
            const duration = parseFloat(lectureDetails.dataValues.duration); // Duration in hours

            // Calculate the start time and end time based on scheduledAt and duration
            const startTime = scheduledAt.clone().subtract(1, 'hour'); // One hour before scheduledAt
            const endTime = scheduledAt.clone().add(duration, 'hours'); // Duration hours after scheduledAt

            // Check if the current datetime is within the specified range
            if (!(newAttendance.attendedAt).isBetween(startTime, endTime)) {
                return res.status(200).json({
                    status: 'FAIL',
                    details: 'Attendance is not within the lecture time',
                    data: lectureDetails,
                });
            }
        }

        // Validation of Enrolled Subject Lectures
        const enrolledSubjects = await enrolmentService.getEnrolledSubjects(newAttendance.studentId);
        if (enrolledSubjects) {
            const subjectList = enrolledSubjects.map((subject) => {
                return subject.dataValues.subjectId;
            });
            if (!subjectList.includes(lectureDetails.dataValues.subjectId)) {
                return res.status(200).json({
                    status: 'FAIL',
                    details: 'You are not enrolled for this Lecture',
                    data: lectureDetails,
                });
            }
        }

        // Call the service function to mark attendance
        const attendance = await attendanceService.createAttendance(newAttendance)
        // Handle the data (attendance) and send a response
        res.status(200).json({
            status: 'OK',
            data: attendance
        })
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({
            error: 'Internal server error',
            details: error
        })
    }
}

const updateAttendance = async (req, res) => {
    try {
        const { params: { attendanceId } } = req
        const { body } = req
        if (!attendanceId) {
            return
        }
        const updatedData = {
            studentId: req.student.id,
            lectureId: body.lectureId,
            deviceData: body.deviceData,
            attendedAt: body.attendedAt
        }
        // Call the service function to get the Attendance by id
        const attendance = await AttendanceService.updateAttendance(attendanceId, updatedData)
        // Handle the data (Attendance) and send a response
        res.status(200).json({
            status: 'OK',
            data: attendance
        })
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({
            error: 'Internal server error',
            details: error
        })
    }
}

const deleteAttendance = async (req, res) => {
    try {
        const { params: { attendanceId } } = req
        if (!attendanceId) {
            return
        }
        // Call the service function to get the Attendance by id
        const attendance = await attendanceService.deleteAttendance(attendanceId)
        // Handle the data (Attendance) and send a response
        res.status(200).json({
            status: 'OK',
            data: attendance
        })
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({
            error: 'Internal server error',
            details: error
        })
    }
}

module.exports = {
    getAllAttendances,
    getStudentAttendance,
    getOneAttendance,
    markAttendance,
    addAttendance,
    updateAttendance,
    deleteAttendance
}