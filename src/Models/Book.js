const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true
    }
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;