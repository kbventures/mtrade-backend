require('dotenv').config();

const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const tradesRoutes = require('./routes/trades');
const userRoutes = require('./routes/user');
const binanceRoutes = require('./routes/binance');

// express app
const app = express();

// Set up mongoose connection
if (process.env.NODE_ENV !== 'test') {
        // connect to db
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.MONGO_URI)
                .then(() => {
                        // eslint-disable-next-line no-console
                        console.log('Connected to db');
                })
                .catch((error) => {
                        /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
                        console.error(error);
                });
}

// Middleware
app.use(cors());
app.use(
        bodyParser.urlencoded({
                extended: true,
        })
);

app.use(express.json());
app.use((req, res, next) => {
        // eslint-disable-next-line no-console
        console.log(req.path, req.method);
        next();
});

// routes
app.use('/api/trades', tradesRoutes);
app.use('/api/user', userRoutes);
// Entry point will need to be refactored to eneable other exchanges in the future.
app.use('/api/binance', binanceRoutes);

// Back end is working browser message
app.get('/api', (req, res) => {
        res.send('Hello World!');
});

app.get('/', (req, res) => res.status(200).send('hello from server'));

module.exports = app;
