const express   = require('express');
const path      = require('path');
const ejs       = require('ejs');//lib qui interprete des templates html
const app       = express();
const session   = require('express-session');//gère la variable de session: cookie dans le navigateur qui contient les infos de session (ex: id de l'utilisateur)
const connectDB = require('./config/database'); // 
const PORT      = process.env.APP_PORT || 3000;
const security = require('./src/Middleware/Security');// 

connectDB();//démarrage du serveur

app.set('views', path.join(__dirname, "templates"));
app.set('view engine', "html");
app.engine('html', ejs.__express);

// Rendre les fichiers statiques accessibles au public
app.use( express.static( path.join(__dirname, "public") ) );
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));// rend les fichiers css de bootstrap accessibles et renomme le dossier en css
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

app.use(express.urlencoded({ extended: false }));// permet de traiter les infos du formulaire

app.use(session({
    secret: process.env.APP_SECRET, //permet d'ajouter un niveau de hashage dans la session. Pour le générer: https://www.md5online.org/ (ex: "123456" => "e10adc3949ba59abbe56e057f20f883e")
    resave: false, //empeche la session d'etre regénérée à chaque requete
    saveUninitialized: true, // si la session n'est pas initialisée, elle est enregistrée
    cookie: { secure: false }// j'ai pas de https. Si je mets true, alors je serai en https
}));

app.use(security.isLogged);// exporte l'execution de la fonction isLogged dans la view (dans header.html)

app.use('/', require('./config/router'));

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur  http://localhost:${PORT}`);
});