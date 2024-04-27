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

const getSubjectAttendance = async (req, res) => {
    try {
        const { body } = req;
        const subjectId = body.subjectId;
        const startDate = (body.startDate) ? new Date(body.startDate) : new Date(0);
        const endDate = (body.endDate) ? new Date(body.endDate) : new Date();

        // Get student enrolled subjects
        const enrolments = await enrolmentService.getEnrolledStudents(subjectId);

        // Get lectures of subject
        const subjectLectures = await lectureService.getAllLecturesBySubject(subjectId);

        // Get attenedance of student
        let counter = 1;
        const attendances = await Promise.all(subjectLectures.map(async (lecture) => {
            const studentAttendance = await Promise.all(enrolments.map(async (enrolment) => {
                const attendance = await attendanceService.getAttendanceByStudentLecture(enrolment.studentId, lecture.id);
                const studentData = {
                    id: counter++,
                    name: enrolment.student.name,
                    indexNo: enrolment.student.indexNo,
                    lecture: lecture,
                    attendedAt: (attendance) ? attendance.attendedAt : null
                }
                return studentData;
            }))
            return studentAttendance; // Return the modified lecture object
        }));

        const subjectAttendance = attendances.flat();
        // Sort the data by the 'id' field
        subjectAttendance.sort((a, b) => a.id - b.id);

        // Filter Subject Attendance by Date
        const filteredAttendances = subjectAttendance.filter(attendance => {
            const scheduledAt = new Date(attendance.lecture.scheduledAt);
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
        let counter = 1;
        const attendances = await Promise.all(enrolments.map(async (enrolment) => {
            const attendance = await attendanceService.getAttendanceByStudentLecture(enrolment.studentId, lectureId);
            const studentData = {
                id: counter++,
                name: enrolment.student.name,
                indexNo: enrolment.student.indexNo,
                attendedAt: (attendance) ? attendance.attendedAt : null
            }
            return studentData; // Return the modified lecture object
        }));
        // Sort the data by the 'id' field
        attendances.sort((a, b) => a.id - b.id);

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
    getSubjectAttendance,
    getLectureAttendance
}