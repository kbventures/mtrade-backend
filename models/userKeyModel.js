const mongoose = require('mongoose');

const { Schema } = mongoose;

const apiSchema = new Schema(
        {
                apiKey: {
                        type: String,
                        required: true,
                },
                secretKey: {
                        type: String,
                        required: true,
                },
                userId: {
                        type: String,
                        required: true,
                },
        },
        { timestamps: true }
);

module.exports = mongoose.model('Api', apiSchema);
