// server/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
require('dotenv').config(); // To use environment variables from a .env file

// Import your API routes (we will create this next)
const attendanceRoutes = require('./routes/attendance');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students'); 
const notificationRoutes = require('./routes/notifications'); 

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
// Enable Cross-Origin Resource Sharing for your React app
app.use(cors()); 
// Enable the express server to parse JSON bodies
app.use(express.json());

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/attendanceDB')
    .then(() => console.log('Successfully connected to MongoDB.'))
    .catch(err => console.error('Connection error', err));

// --- API Routes ---
// Tell Express to use the routes we will define
// All routes in 'attendanceRoutes' will be prefixed with /api/attendance
app.use('/api/attendance', attendanceRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/students', studentRoutes);
app.use('/api/notifications', notificationRoutes);

// --- Socket.IO Setup ---
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Allow your React app to connect
        methods: ["GET", "POST"]
    }
});

// This is a global way to access 'io' in your routes
// We attach it to the request object
app.set('socketio', io);

io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });
});

// --- Start the Server ---
server.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});