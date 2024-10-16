const bcrypt = require('bcrypt');
const User = require('./../Models/User');
const { validationResult } = require('express-validator');

/**
 * Register a new user
 * -> Display the registration from if method GET
 * -> Treat registration data if method POST
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.registration = async (req, res) => {

    const { 
        username, 
        email, 
        password 
    } = req.body;

    const errors = validationResult(req);

    if (req.method === 'POST' && errors.isEmpty()) {

        const user = await User.findOne({ email });

        if (user) {
            return res.render('pages/register/index', {
                errors: [{ msg: "L'utilisateur existe déjà" }],
                username: username,
                email: email,
            });
        }

        user = new User({ 
            username, 
            email, 
            password 
        });
        await user.save();

        res.redirect('/login');
    }

    res.render('pages/security/register', {
        errors: errors.array(),
        username: username,
        email: email,
    });
};

/**
 * Authenticate a user
 * -> Display the authentication from if method GET
 * -> Treat authentication data if method POST
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.authentication = async (req, res) => {

    const { 
        email, 
        password
    } = req.body;

    const errors = [];

    if (req.method === 'POST') {

        if (!email || !password) {
            errors.push({ msg: "Please enter both email and password." });
        }

        let user = await User.findOne({ email });

        // is User don't exists ?
        if (!user) {
            errors.push({ msg: "Invalid credentials (1)" });
        } else {
            // Check user password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                errors.push({ msg: "Invalid credentials (2)" });
            } 
        }

        if (errors.length === 0) {
            req.session.user = user;
            return res.redirect(req.get('Referrer') || '/'); 
        }
    }

    res.render('pages/security/authentication', {
        errors,
    });
};

/**
 * Disconnect an authenticated user by session destruction
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error during logout:', err);
            return res.redirect('/'); 
        }
        res.redirect('/login');
    });
};