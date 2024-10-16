const express   = require('express');
const path      = require('path');
const ejs       = require('ejs');
const app       = express();
const session   = require('express-session');
const connectDB = require('./config/database');
const PORT      = process.env.APP_PORT || 3000;
const security = require('./src/Middleware/Security');

connectDB();

app.set('views', path.join(__dirname, "templates"));
app.set('view engine', "html");
app.engine('html', ejs.__express);

app.use( express.static( path.join(__dirname, "public") ) );
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: true, 
    cookie: { secure: false }
}));
app.use(security.isLogged);

app.use('/', require('./config/router'));

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur  http://localhost:${PORT}`);
});