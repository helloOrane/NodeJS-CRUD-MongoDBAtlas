const express = require('express');
const router = express.Router();

const security = require('../src/Middleware/Security')
const userChecker = require('../src/Checker/UserChecker')
const bookChecker = require('../src/Checker/BookChecker')

const homepageController = require('./../src/Controllers/HomepageController');
const bookController = require('./../src/Controllers/BookController');
const securityController = require('../src/Controllers/SecurityController');


// Homepage
// --

router.get('/', homepageController.index);


// Books
// --

// Index
router.get('/books', bookController.index);

// Create
router.get('/book', security.isGranted, bookController.create);// security.isGranted est un middleware qui permet de vérifier si l'utilisateur est connecté. Elle s'execute avant la fonction bookController.create
router.post('/book', security.isGranted, bookChecker.create, bookController.create);// controle si connecté, les données du formulaire sont valides et execute la fonction bookController.create

// Read
router.get('/book/:id', bookController.read);

// Update
router.get('/book/:id/edit', security.isGranted, bookController.update);
router.post('/book/:id/edit', security.isGranted, bookController.update);

// Delete
router.get('/book/:id/delete', security.isGranted, bookController.delete);
router.post('/book/:id/delete', security.isGranted, bookController.delete);


// Security
// --

// Registration
router.get('/register', security.isAuthenticated, securityController.registration);
router.post('/register', userChecker.registration, securityController.registration);

// Authentication
router.get('/login', security.isAuthenticated, securityController.authentication);
router.post('/login', securityController.authentication);

// Logout
router.get('/logout', security.isGranted, securityController.logout);

module.exports = router;
