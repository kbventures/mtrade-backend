const mongoose = require('mongoose');

const { Schema } = mongoose;

const historySchema = new Schema(
        {
                symbol: {
                        type: String,
                        required: true,
                },
                id: {
                        type: Number,
                        required: true,
                },
                orderId: {
                        type: Number,
                        required: true,
                },
                orderIdList: {
                        type: Number,
                        required: true,
                },
                price: {
                        type: Number,
                        required: true,
                },
                qty: {
                        type: String,
                        required: true,
                },
                quoteQty: {
                        type: String,
                        required: true,
                },
                commission: {
                        type: String,
                        required: true,
                },
                commissionAsset: {
                        type: String,
                        required: true,
                },
                time: {
                        type: Number,
                        required: true,
                },
                isBuyer: {
                        type: Boolean,
                        required: true,
                },
                isMaker: {
                        type: Boolean,
                        required: true,
                },
                isBestMatch: {
                        type: Boolean,
                        required: true,
                },
                userId: {
                        type: String,
                        required: true,
                },
        },
        { timestamps: true }
);

module.exports = mongoose.model('History', historySchema);
