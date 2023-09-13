const express = require('express');
const app = express();

require('dotenv').config();
const port = process.env.PORT;

const {DB} = require('./database/connect');

// Routes
const v1SubjectRouter = require('./routes/v1/subjectRouter');

DB.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

// Routes
app.use("/api/v1/subjects", v1SubjectRouter);

app.get('/', (req, res) => res.send('Smart-Attendance-API'));
app.listen(port, () => console.log(`Attendace API app listening on port ${port}!`));