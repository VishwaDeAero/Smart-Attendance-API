const enrolmentService = require('../services/enrolmentService');
const lectureService = require('../services/lectureService');
const attendanceService = require('../services/attendanceService');

const getStudentAttendance = async (req, res) => {
    try {
        const { body } = req;
        console.log(body)
        const studentId = body.student_id;
        const startDate = (body.start_date) ? new Date(body.start_date) : new Date(0);
        const endDate = (body.end_date) ? new Date(body.end_date) : new Date();

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

module.exports = {
    getStudentAttendance
}