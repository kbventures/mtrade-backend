const express = require('express');

const { addApi, getHistory, updateHistory } = require('../controllers/binanceController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

// GET all trades
router.post('/', addApi);
router.get('/', getHistory);
router.get('/update', updateHistory);
module.exports = router;
