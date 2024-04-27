const enrolmentService = require('../services/enrolmentService');
const lectureService = require('../services/lectureService');
const attendanceService = require('../services/attendanceService');

const getStudentAttendance = async (req, res) => {
    try {
        const { body } = req;
        const studentId = body.studentId;
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

const getLectureAttendance = async (req, res) => {
    try {
        const { body } = req;
        const lectureId = body.lectureId;
        const subjectId = body.subjectId;

        // Get student enrolled subjects
        let enrolments = await enrolmentService.getEnrolledStudents(subjectId);

        // Get attenedance of lecture
        const attendances = await Promise.all(enrolments.map(async (enrolment) => {
            const attendance = await attendanceService.getAttendanceByStudentLecture(enrolment.studentId, lectureId);
            const studentData = {
                id: enrolment.student.id,
                name: enrolment.student.name,
                indexNo: enrolment.student.indexNo,
                attendedAt: (attendance) ? attendance.attendedAt : null
            }
            return studentData; // Return the modified lecture object
        }));


        res.status(200).json({
            status: 'OK',
            data: attendances
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
    getStudentAttendance,
    getLectureAttendance
}