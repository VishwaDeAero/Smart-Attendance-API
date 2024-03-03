const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');

require('dotenv').config();
const port = process.env.PORT;

const { DB } = require('./database/connect');

// Routes
const v1SubjectRouter = require('./routes/v1/subjectRouter');
const v1StudentRouter = require('./routes/v1/studentRouter');
const v1LectureRouter = require('./routes/v1/lectureRouter');
const v1UserRouter = require('./routes/v1/userRouter');
const v1AttendanceRouter = require('./routes/v1/attendanceRouter');

DB.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
    process.exit(1);
});

// If you want to handle unhandled rejections as well
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // You can choose to exit the process here
    process.exit(1);
});

// Enable CORS for all requests
app.use(cors());
// Routes
app.use(bodyParser.json());
app.use("/api/v1/subjects", v1SubjectRouter);
app.use("/api/v1/students", v1StudentRouter);
app.use("/api/v1/lectures", v1LectureRouter);
app.use("/api/v1/users", v1UserRouter);
app.use("/api/v1/attendances", v1AttendanceRouter);

app.get('/', (req, res) => res.send('Smart-Attendance-API'));
app.listen(port, () => console.log(`Attendace API app listening on port ${port}!`));