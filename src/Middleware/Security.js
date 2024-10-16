/**
 * isGranted, 
 * Redirect to the login page if user is not authenticated
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.isGranted = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
};

/**
 * isAuthenticated,
 * Redirect the user to the homepage if is already authenticated
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/');
    }
    next();
};

exports.isLogged = (req, res, next) => {
    res.locals.isLogged = !!req.session.user;
    res.locals.username = req.session.user ? req.session.user.username : null;
    next();
};
