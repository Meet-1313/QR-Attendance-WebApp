// server/models/Student.js
const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    enrolledClass: { type: String, required: true },
    parentEmail: { type: String },
});
module.exports = mongoose.model('Student', studentSchema);