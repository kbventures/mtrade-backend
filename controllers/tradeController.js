const mongoose = require('mongoose');
const Trade = require('../models/tradeModel.js');

// get all trades
const getTrades = async (req, res) => {
        const userId = req.user._id;
        const trades = await Trade.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(trades);
};

// get a single trade
const getTrade = async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json({ error: 'No such trade' });
        }

        const trade = await Trade.findById(id);
        if (!trade) {
                return res.status(404).json({ error: 'No such trade' });
        }
        res.status(200).json(trade);
};

// create a new trade
// Testing

const createTrade = async (req, res) => {
        const { pair, price, amount, closedPrice, openedDate, closedDate } = req.body;

        const emptyFields = [];
        if (!pair) {
                emptyFields.push('pair');
        }
        if (!price) {
                emptyFields.push('price');
        }
        if (!amount) {
                emptyFields.push('amount');
        }
        if (!closedPrice) {
                emptyFields.push('closedPrice');
        }
        if (!openedDate) {
                emptyFields.push('openedDate');
        }
        if (!closedDate) {
                emptyFields.push('closedDate');
        }

        if (emptyFields.length > 0) {
                return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
        }

        // add trade to db
        try {
                const userId = req.user._id;
                const trade = await Trade.create({
                        userId,
                        pair,
                        price,
                        amount,
                        closedPrice,
                        openedDate,
                        closedDate,
                });
                res.status(200).json(trade);
        } catch (error) {
                res.status(400).json({ error: error.message });
        }
};

// delete a trade
const deleteTrade = async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json({ error: 'No such trade' });
        }

        const trade = await Trade.findOneAndDelete({ _id: id });

        if (!trade) {
                return res.status(400).json({ error: 'No such trade' });
        }

        res.status(200).json(trade);
};

// update a trade
const updateTrade = async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json({ error: 'No such trade' });
        }

        const trade = await Trade.findOneAndUpdate(
                { _id: id },
                {
                        ...req.body,
                }
        );

        if (!trade) {
                return res.status(400).json({ error: 'No such trade' });
        }

        res.status(200).json(trade);
};

module.exports = {
        createTrade,
        getTrades,
        getTrade,
        deleteTrade,
        updateTrade,
};
