const enrolmentService = require('../services/enrolmentService');
const lectureService = require('../services/lectureService');
const attendanceService = require('../services/attendanceService');

const getDailyAttendanceStats = async (req, res) => {
    try {
        const { body } = req;
        const startDate = (body.startDate) ? new Date(body.startDate) : new Date().setHours(0);
        const endDate = (body.endDate) ? new Date(body.endDate) : new Date().setHours(24);

        // Get All Lectures for today
        let allLectures = await lectureService.getLecturesByDate(startDate, endDate);
        let heldLectures = await lectureService.getLecturesByDate(startDate, new Date());

        // Get Held Lecture Subjects
        let heldLecturesSubjects = heldLectures.map((lecture) => { return lecture.subjectId });
        heldLecturesSubjects = Array.from(new Set(heldLecturesSubjects));

        // Get Enrolled Students
        let enrolledStudents = await Promise.all(heldLecturesSubjects.map(async (subjectId) => {
            const students = await enrolmentService.getEnrolledStudents(subjectId);
            const studentData = students.map((enrolment) => {
                return {
                    id: enrolment.student.id,
                    name: enrolment.student.name,
                    indexNo: enrolment.student.indexNo
                }
            })
            return studentData
        }));
        enrolledStudents = enrolledStudents.flat();

        // Get Daily Attendance
        let dailyAttendance = await attendanceService.getAttendanceByDate(startDate, endDate)

        res.status(200).json({
            status: 'OK',
            data: {
                allLectures,
                heldLectures,
                enrolledStudents,
                dailyAttendance
            }
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

const getAttendanceStats = async (req, res) => {
    try {
        const { body } = req;
        const startDate = (body.startDate) ? new Date(body.startDate) : new Date().setHours(0);
        const endDate = (body.endDate) ? new Date(body.endDate) : new Date().setHours(24);

        // Get All Lectures for range
        let lecturesData = await lectureService.getLecturesByDate(startDate, endDate);

        // Get All Attendances for range
        let attendanceData = await attendanceService.getAttendanceByDate(startDate, endDate);

        // Get Enrolled Students of Each Lecture Subject
        let enrolledLectureData = await Promise.all(lecturesData.map(async (lecture) => {
            const students = await enrolmentService.getEnrolledStudents(lecture.subjectId);
            const studentData = students.map((enrolment) => {
                return {
                    id: enrolment.student.id,
                    name: enrolment.student.name,
                    indexNo: enrolment.student.indexNo
                }
            })
            lecture.dataValues.enrolledStudents = studentData;
            return lecture;
        }));

        res.status(200).json({
            status: 'OK',
            data: {
                enrolledLectureData,
                attendanceData
            }
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

module.exports = {
    getDailyAttendanceStats,
    getAttendanceStats
}