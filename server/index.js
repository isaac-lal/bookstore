import express from 'express';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
// Option 1: Allow all origins with default of cors(*)
// app.use(cors());
// Option 2: Allow custom origins
app.use(
  cors({
    origin: 'https://bookstore.isaaclal.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// HTTP Route
app.get('/', (req, res) => {
  console.log(req);
  return res.status(234).send('Bookstore');
});

app.use('/books', booksRoute);

// Node.js routes without express
/*
// Route for saving a new book
app.post('/books', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (err) {
    // catch errors from connecting to the database
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route for getting all books from mongo database
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route for getting one book from database by id
app.get('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    return res.status(200).json(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route for updating a book
app.put('/books/:id', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).send({ message: 'Book found!' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route for deleting a book
app.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).send({ message: 'Book deleted successfully!' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});
*/

// Connect to MongoDB database
mongoose
  .connect(process.env.MongoDB_URL)
  .then(() => {
    console.log('App connected to database');

    // Listen on port
    app.listen(process.env.NODE_PORT, () => {
      console.log(`App is listening to port: ${process.env.NODE_PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
