const { check } = require('express-validator');

exports.create = [
    check('title', 'Title is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    check('price', 'Price must be a numerical value').isNumeric(),
];