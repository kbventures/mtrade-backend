const mongoose = require('mongoose');

const { Schema } = mongoose;

const tradeSchema = new Schema(
        {
                apiKey: {
                        type: String,
                        required: true,
                },
                secretKey: {
                        type: Number,
                        required: true,
                },
                userId: {
                        type: String,
                        required: true,
                },
        },
        { timestamps: true }
);

module.exports = mongoose.model('Api', tradeSchema);
