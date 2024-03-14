// In authMiddleware.js

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, 'your-secret-key', (err, decodedToken) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.userId = decodedToken.userId;
        next();
    });
}

module.exports = {
    authenticateToken
};
