const attendanceService = require('../services/attendanceService')
const moment = require('moment')

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
        const { body } = req
        const newAttendance = {
            studentId: req.student.id,
            lectureId: body.lectureId,
            deviceData: body.deviceData,
            attendedAt: moment()
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

const addAttendance = async (req, res) => {
    try {
        const { body } = req
        const newAttendance = {
            studentId: body.studentId,
            lectureId: body.lectureId,
            deviceData: 'Admin Account',
            attendedAt: body.attendedAt
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
    getOneAttendance,
    markAttendance,
    addAttendance,
    updateAttendance,
    deleteAttendance
}