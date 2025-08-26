// server/routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher'); // Make sure you have the Teacher model from earlier
const auth = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

// --- REGISTRATION ENDPOINT ---
// Endpoint: POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if teacher already exists
        let teacher = await Teacher.findOne({ email });
        if (teacher) {
            return res.status(400).json({ message: 'A user with this email already exists.' });
        }

        // Create a new teacher instance
        teacher = new Teacher({ name, email, password });

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        teacher.password = await bcrypt.hash(password, salt);

        await teacher.save();

        res.status(201).json({ message: 'Registration successful!' });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// --- LOGIN ENDPOINT ---
// Endpoint: POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if teacher exists
        const teacher = await Teacher.findOne({ email });
        if (!teacher) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Compare submitted password with the hashed password in the DB
        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Create JWT payload
        const payload = {
            teacher: {
                id: teacher.id
            }
        };

        // Sign the token
        jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});
router.get('/me', auth, async (req, res) => {
    try {
        // req.teacher.id is attached by the auth middleware
        // We use .select('-password') to exclude the password from the result
        const teacher = await Teacher.findById(req.teacher.id).select('-password');
        res.json(teacher);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;