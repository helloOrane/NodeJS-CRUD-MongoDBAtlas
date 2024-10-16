const Book = require('./../Models/Book');
const { validationResult } = require('express-validator');

/**
 * Books Index
 * Display the list of books
 * 
 * TODO: Add pager
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.index = async (req, res) => {

    const books = await Book.find(); 

    res.render('pages/book/index', {
        books: books,
    })
}

/**
 * Create a new Book
 * -> Display the book from if method GET
 * -> Add new book if method POST
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.create = async (req, res) => {

    const { 
        title, 
        description, 
        price 
    } = req.body;

    const errors = validationResult(req);

    let book; 
    
    if (req.method === 'POST' && errors.isEmpty()) {

        book = new Book({ 
            title, 
            description, 
            price 
        });

        await book.save();

        res.redirect(`/book/${book.id}`);
    }

    res.render('pages/book/create', {
        errors: errors.array(),
        book: book,
        title: title,
        description: description,
        price: price,
    })
}

/**
 * Read a Book details
 * -> Display an identified book's details
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.read = async (req, res) => {

    const { id } = req.params; 
    const book = await Book.findById(id);

    if (!book) {
        return res.status(404).render('pages/error/not-found', {
            errors: [{ msg: "Book not found." }],
        });
    }

    res.render('pages/book/read', {
        book: book
    })
}

/**
 * Update a Book data
 * -> Display the book from if method GET
 * -> Update a book if method POST
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.update = async (req, res) => {

    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
        return res.status(404).render('pages/error/not-found', {
            errors: [{ msg: "Book not found." }],
        });
    }

    const errors = validationResult(req);

    const title = req.body.title || book.title;
    const description = req.body.description || book.description;
    const price = req.body.price || book.price;

    if (req.method === 'POST' && errors.isEmpty()) {

        await Book.findByIdAndUpdate(id, {
            title,
            description,
            price,
        });

        return res.redirect(`/book/${id}`);
    }

    res.render('pages/book/update', {
        errors: errors.array(),
        book: book,
        title: title,
        description: description,
        price: price,
    })
}

/**
 * Delete a Book
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = async (req, res) => {

    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
        return res.status(404).render('pages/error/not-found', {
            errors: [{ msg: "Book not found." }],
        });
    }
    if (req.method === 'POST') {

    }

    res.render('pages/book/delete')
}