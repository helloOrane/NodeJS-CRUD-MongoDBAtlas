const { check } = require('express-validator');

exports.registration = [
    check('username', 'User name is required').not().isEmpty(),
    check('email', 'Write a valid email address').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
];