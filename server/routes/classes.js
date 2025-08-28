// server/routes/classes.js
const express = require('express');
const router = express.Router();
const Class = require('../models/Class');
const auth = require('../middleware/auth');

// GET /api/classes
// Role: Gets all classes for the logged-in teacher
router.get('/', auth, async (req, res) => {
    try {
        // Find classes where the 'teacher' field matches the logged-in teacher's ID
        const classes = await Class.find({ teacher: req.teacher.id });
        res.json(classes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.post('/', auth, async (req, res) => {
    const { name, classCode } = req.body;
    try {
        const newClass = new Class({
            name,
            classCode,
            teacher: req.teacher.id // Assigns the class to the logged-in teacher
        });

        const savedClass = await newClass.save();
         console.log(`Class Created: ${savedClass.name} (ID: ${savedClass._id})`);

        res.status(201).json(savedClass);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.put('/:id', auth, async (req, res) => {
    const { name, classCode } = req.body;
    try {
        let cls = await Class.findById(req.params.id);
        if (!cls) return res.status(404).json({ msg: 'Class not found' });

        // Ensure the teacher owns this class
        if (cls.teacher.toString() !== req.teacher.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        cls.name = name;
        cls.classCode = classCode;
        await cls.save();
        res.json(cls);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// DELETE /api/classes/:id
// Role: Deletes a class
router.delete('/:id', auth, async (req, res) => {
    try {
        let cls = await Class.findById(req.params.id);
        if (!cls) return res.status(404).json({ msg: 'Class not found' });

        // Ensure the teacher owns this class
        if (cls.teacher.toString() !== req.teacher.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await cls.deleteOne();
        res.json({ msg: 'Class removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;