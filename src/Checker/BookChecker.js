const { check } = require('express-validator');

// on vérifie les données du formulaire avant de les envoyer à la base de données
exports.create = [
    check('title', 'Title is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    check('price', 'Price must be a numerical value').isNumeric(),
];