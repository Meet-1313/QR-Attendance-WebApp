// server/routes/notifications.js
const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const { sendLowAttendanceEmail } = require('../utils/mailer');

// POST /api/notifications/low-attendance
router.post('/low-attendance', async (req, res) => {
    const { classId, threshold } = req.body; // e.g., classId: "CS101", threshold: 75

    try {
        // 1. Get total number of unique attendance days (sessions) for the class
        const totalSessions = await Attendance.aggregate([
            { $match: { class: classId } },
            { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } } } },
            { $count: 'total' }
        ]);

        if (totalSessions.length === 0 || totalSessions[0].total === 0) {
            return res.status(404).json({ message: 'No attendance records found for this class.' });
        }
        const totalClassDays = totalSessions[0].total;

        // 2. Get attendance count for each student in that class
        const studentAttendance = await Attendance.aggregate([
            { $match: { class: classId } },
            { $group: { _id: '$student', daysPresent: { $sum: 1 } } }
        ]);
        
        // 3. Find all students enrolled in the class
        const enrolledStudents = await Student.find({ enrolledClass: classId });

        // 4. Calculate percentage and filter for low attendance
        const lowAttendanceStudents = [];
        for (const student of enrolledStudents) {
           const record = studentAttendance.find(sa => sa._id.toString() === student._id.toString());
            const daysPresent = record ? record.daysPresent : 0;
            const percentage = (daysPresent / totalClassDays) * 100;

            if (percentage < threshold) {
                lowAttendanceStudents.push({
                    name: student.name,
                    studentId: student.studentId,
                    parentEmail: student.parentEmail,
                    percentage: Math.round(percentage)
                });
            }
        }
        
        // 5. Send emails to parents
        for(const student of lowAttendanceStudents) {
            if (student.parentEmail) {
                await sendLowAttendanceEmail(student.parentEmail, student.name);
            }
        }

        res.json({
            message: `${lowAttendanceStudents.length} students found with low attendance. Notifications sent.`,
            students: lowAttendanceStudents
        });

    } catch (error) {
        console.error('Error in low attendance check:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;