const express = require('express');

const {
        addSecretKey,
        getTrades,
        updateTrades,
        updateSpecificPair,
        getTrade,
} = require('../controllers/binanceController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

// GET all trades
router.post('/', addSecretKey);
router.get('/', getTrades);
router.get('/updatetrades', updateTrades);
router.get('/updatespecificpair/:pair', updateSpecificPair);
router.get('/specifictrade', getTrade);
module.exports = router;
