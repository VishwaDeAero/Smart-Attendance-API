// Run this when you create or update DB tables through models
const express = require('express');
const app = express();

require('dotenv').config();
const {DB} = require('./database/connect');

const Attendace = require('./models/attendanceModel');
const Enrolment = require('./models/enrolmentModel');
const Lecture = require('./models/lectureModel');
const Subject = require('./models/subjectModel');
const Student = require('./models/studentModel');
const User = require('./models/userModel');

DB.sync({alter:true}).then(() => {
    console.log('DB sync successfully.');
}).catch((error) => {
    console.error('Unable to sync the database: ', error);
});