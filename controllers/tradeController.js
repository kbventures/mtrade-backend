const Trade = require("../models/tradeModel.js");
const mongoose = require("mongoose");

// get all trades
const getTrades = async (req, res) => {
  const trades = await Trade.find({}).sort({ createdAt: -1 });
  res.status(200).json(trades);
};

// get a single trade
const getTrade = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such trade" });
  }

  const trade = await Trade.findById(id);
  if (!trade) {
    return res.status(404).json({ error: "No such trade" });
  }
  res.status(200).json(trade);
};

// create a new trade

const createTrade = async (req, res) => {
  const { pair, price, amount, closedPrice, openedDate, closedDate } = req.body;
  try {
    const trade = await Trade.create({
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
    return res.status(404).json({ error: "No such trade" });
  }

  const trade = await Trade.findOneAndDelete({ _id: id });

  if (!trade) {
    return res.status(400).json({ error: "No such trade" });
  }

  res.status(200).json(trade);
};

// update a trade
const updateTrade = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such trade" });
  }

  const trade = await Trade.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!trade) {
    return res.status(400).json({ error: "No such trade" });
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
