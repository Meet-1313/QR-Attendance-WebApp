// server/routes/students.js

const express = require('express');
const router = express.Router();
const Student = require('../models/Student'); // Make sure you have the Student model from earlier

// Endpoint: GET /api/students
// Role: Fetches all students from the database
const auth = require('../middleware/auth');
router.get('/', auth, async (req, res) => { 
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});
router.get('/count', auth, async (req, res) => {
    try {
        const count = await Student.countDocuments();
        res.json({ count });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});
router.post('/', auth, async (req, res) => {
    const { studentId, name, enrolledClass, parentEmail } = req.body;
    try {
        // Check if student ID already exists
        let student = await Student.findOne({ studentId });
        if (student) {
            return res.status(400).json({ msg: 'Student with this ID already exists' });
        }

        student = new Student({
            studentId,
            name,
            enrolledClass,
            parentEmail
        });

        await student.save();
        res.status(201).json(student);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.put('/:id', auth, async (req, res) => {
    const { studentId, name, enrolledClass, parentEmail } = req.body;
    try {
        let student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ msg: 'Student not found' });

        // Update fields
        student.studentId = studentId;
        student.name = name;
        student.enrolledClass = enrolledClass;
        student.parentEmail = parentEmail;

        await student.save();
        res.json(student);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// DELETE /api/students/:id
// Role: Deletes a student
router.delete('/:id', auth, async (req, res) => {
    try {
        let student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ msg: 'Student not found' });

        await student.deleteOne();
        res.json({ msg: 'Student removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;