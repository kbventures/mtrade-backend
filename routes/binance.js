const express = require('express');

const { createApi, updateHistory } = require('../controllers/binanceController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

// GET all trades
router.post('/', createApi);
router.get('/', updateHistory);
// router.get('/', getHistory);

module.exports = router;
