require('dotenv').config();

const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const tradesRoutes = require('./routes/trades');
const userRoutes = require('./routes/user');
const apiRoutes = require('./routes/api');
// express app
const app = express();

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
app.use('api/addApi', apiRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
        .then(() => {
                // listen for requests
                app.listen(process.env.PORT, () => {
                        // eslint-disable-next-line no-console
                        console.log('Connected to db & listening on port', process.env.PORT || 4000);
                });
        })
        .catch((error) => {
                /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
                console.error(error);
        });
