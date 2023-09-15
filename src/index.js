const express = require('express');
const app = express();
const bodyParser = require("body-parser");

require('dotenv').config();
const port = process.env.PORT;

const {DB} = require('./database/connect');

// Routes
const v1SubjectRouter = require('./routes/v1/subjectRouter');
const v1StudentRouter = require('./routes/v1/studentRouter');
const v1LectureRouter = require('./routes/v1/lectureRouter');

DB.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

// Routes
app.use(bodyParser.json());
app.use("/api/v1/subjects", v1SubjectRouter);
app.use("/api/v1/students", v1StudentRouter);
app.use("/api/v1/lectures", v1LectureRouter);

app.get('/', (req, res) => res.send('Smart-Attendance-API'));
app.listen(port, () => console.log(`Attendace API app listening on port ${port}!`));