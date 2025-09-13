const crypto = require('crypto');

const csrfProtection = {
    generateToken: (req) => {
        const token = crypto.randomBytes(32).toString('hex');
        req.session.csrfToken = token;
        return token;
    },

    validateToken: (req, res, next) => {
        if (req.method === 'GET') {
            return next();
        }

        const sessionToken = req.session.csrfToken;
        const requestToken = req.body._csrf || req.headers['x-csrf-token'];

        if (!sessionToken || !requestToken || sessionToken !== requestToken) {
            return res.status(403).json({
                error: 'Token CSRF inválido'
            });
        }

        next();
    }
};

module.exports = csrfProtection;