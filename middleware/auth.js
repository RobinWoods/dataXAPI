const jwt = require('jsonwebtoken');


function extractCookies(cookieHeader) {
    const cookies = {};
    if (cookieHeader) {
        cookieHeader.split(';').forEach(cookie => {
            const parts = cookie.split('=');
            const name = parts.shift().trim();
            const value = decodeURIComponent(parts.join('='));
            cookies[name] = value;
        });
    }
    return cookies;
}

function authenticateToken(req, res, next) {
    const token = extractCookies(req.headers['cookie'])['jwt'];
    if (!token) {
        return res.status(401).json({ message: 'Token manquant' });
    }
    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token invalide' });
        }
        req.user = decoded;
        next();
    });
}

function checkPoste(role) {
    return (req, res, next) => {
        if (req.user && (req.user.role === (role || "Admin"))) {
            next();
        } else {
            res.status(403).json({ message: 'Accès interdit' });
        }
    };
}

module.exports = {
    authenticateToken,
    checkPoste
}