const express = require('express');

const { createTrade, getTrades, getTrade, deleteTrade, updateTrade } = require('../controllers/tradeController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

// GET all trades
router.get('/', getTrades);

// GET a single trade
router.get('/:id', getTrade);

// POST a new trade
router.post('/', createTrade);

// DELETE a trade
router.delete('/:id', deleteTrade);

// UPDATE a trade
router.patch('/:id', updateTrade);

module.exports = router;
