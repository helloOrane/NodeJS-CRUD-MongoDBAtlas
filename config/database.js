require('dotenv').config();
const mongoose = require('mongoose');

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