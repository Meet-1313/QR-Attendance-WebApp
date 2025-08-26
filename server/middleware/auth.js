// server/middleware/auth.js

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

module.exports = function (req, res, next) {
    // Get token from the header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // Attach the user's ID from the token payload to the request object
        req.teacher = decoded.teacher;
        next(); // Move on to the next piece of middleware or the route itself
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};