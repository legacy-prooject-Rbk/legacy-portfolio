const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = isAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'invalid token' })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('verif error:', err);
            return res.status(401).json({ error: 'unauthorized' })
        }
        req.userId = decoded.userId
        next();
    });
};