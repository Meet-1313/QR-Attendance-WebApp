const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const auth = require('../middleware/auth'); // Ensure this is imported

// This route does not need auth because the token is generated before login
router.get('/generate-qr/:classId', (req, res) => {
    const { classId } = req.params;
    const secretKey = process.env.JWT_SECRET || 'your-super-secret-key';
    const payload = { classId: classId, timestamp: Date.now() };
    const token = jwt.sign(payload, secretKey, { expiresIn: '15s' });
    res.json({ token });
});

// This route does not need auth as it would be called from a student app
router.post('/mark', async (req, res) => {
    const { token, studentId } = req.body;
    const secretKey = process.env.JWT_SECRET || 'your-super-secret-key';

    try {
        const decoded = jwt.verify(token, secretKey);
        const student = await Student.findOne({ studentId: studentId });
        if (!student) {
            return res.status(404).json({ message: 'Student not found.' });
        }
        const newAttendance = new Attendance({
            student: student._id,
            class: decoded.classId,
        });
        await newAttendance.save();
        const io = req.app.get('socketio');
        io.emit('attendance-updated', {
            studentId: student.studentId,
            studentName: student.name,
            timestamp: new Date()
        });
        res.status(200).json({ message: 'Attendance marked successfully!' });
    } catch (error) {
        console.error("Marking attendance error:", error);
        res.status(400).json({ message: 'Invalid or expired QR code.' });
    }
});

// SECURED: Get all attendance records
router.get('/records', auth, async (req, res) => {
    try {
        const records = await Attendance.find()
            .populate('student', 'name studentId')
            .sort({ timestamp: -1 });
        res.json(records);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// SECURED: Get attendance summary
router.get('/summary', auth, async (req, res) => {
    try {
        const dailySummary = await Attendance.aggregate([
            { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } }, count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);
        res.json(dailySummary);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;