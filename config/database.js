require('dotenv').config();//lib qui permet de lire les variables d'environnement dans un fichier .env et l'injecter ds node js
const mongoose = require('mongoose');//ORM

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("MongoDB connecté...");
    } catch (error) {
        console.error("Erreur de connexion MongoDB Atlas:", error);
        process.exit(1);
    }
};

module.exports = connectDB;