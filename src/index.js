const express = require('express');
const app = express();

require('dotenv').config();
const port = process.env.PORT;

const {DB} = require('./database/connect');

// import models
const Attendance = require('./models/attendanceModel');
const Enrolment = require('./models/enrolmentModel');
const Lecture = require('./models/lectureModel');
const Student = require('./models/studentModel');
const Subject = require('./models/subjectModel');
const User = require('./models/userModel');

const v1SubjectRouter = require('./routes/v1/subjectRouter');

// Routes
app.use("/api/v1/subjects", v1SubjectRouter);

app.get('/', (req, res) => res.send('Smart-Attendance-API'));
app.listen(port, () => console.log(`Attendace API app listening on port ${port}!`));

DB.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

DB.sync().then(() => {
    console.log('tables created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});