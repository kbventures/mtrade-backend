const express = require('express');

const { createApi } = require('../controllers/apiController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

// GET all trades
router.get('/', createApi);

module.exports = router;
