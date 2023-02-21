const express = require('express');

const { addApi, getSavedHistory, updateTrades, getTrade } = require('../controllers/binanceController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

// GET all trades
router.post('/', addApi);
router.get('/', getSavedHistory);
router.get('/updatetrades', updateTrades);
router.get('/specifictrade', getTrade);
module.exports = router;
