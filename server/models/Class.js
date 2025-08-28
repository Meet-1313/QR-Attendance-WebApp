// server/models/Class.js
const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: { // e.g., "Morning Physics"
        type: String,
        required: true
    },
    classCode: { // e.g., "PHYS101"
        type: String,
        required: true
    },
    teacher: { // Link to the teacher who created this class
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    }
});

module.exports = mongoose.model('Class', classSchema);