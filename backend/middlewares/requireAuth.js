const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET);
        const userId = decoded._id;

        // Check if the decoded ID is valid
        if (!userId) {
            return res.status(401).json({ error: 'Invalid token. Authorization failed.' });
        }

        // Fetch the user
        const user = await User.findById(userId).select('_id');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Attach the user object to the request
        req.user = user;

        // Proceed to the next middleware or route
        next();
    } catch (error) {
        console.error('Authorization error:', error.message);

        // Respond based on the error type
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token. Please log in again.' });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token has expired. Please log in again.' });
        }

        res.status(500).json({ error: 'Authorization failed. Please try again.' });
    }
};

module.exports = auth;
