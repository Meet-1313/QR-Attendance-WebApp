// server/routes/profile.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');
const Teacher = require('../models/Teacher');

// --- Multer Configuration for file uploads ---
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/'); // Make sure this folder exists
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});
const upload = multer({ storage: storage });

// --- UPDATE PROFILE TEXT DATA ---
// PUT /api/profile/
router.put('/', auth, async (req, res) => {
    const { name, email } = req.body;
    try {
        const teacher = await Teacher.findById(req.teacher.id);
        if (!teacher) return res.status(404).json({ msg: 'Teacher not found' });

        teacher.name = name || teacher.name;
        teacher.email = email || teacher.email;
        await teacher.save();
        res.json(teacher);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// --- UPLOAD PROFILE PICTURE ---
// POST /api/profile/picture
router.post('/picture', [auth, upload.single('profilePicture')], async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.teacher.id);
        if (!teacher) return res.status(404).json({ msg: 'Teacher not found' });

        // req.file.path will contain the path to the uploaded file
        teacher.profilePicture = req.file.path;
        await teacher.save();
        res.json(teacher);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;