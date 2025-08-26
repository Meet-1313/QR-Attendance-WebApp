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

module.exports = router;