const Binance = require('../node_modules/node-binance-api');
const Api = require('../models/binanceModel');
const History = require('../models/binanceSpotModel');

// add binance api
const addApi = async (req, res) => {
        const { apiKey, secretKey } = req.body;

        // Check for empty fields
        const emptyFields = [];
        if (!apiKey) {
                emptyFields.push('apiKey');
        }
        if (!secretKey) {
                emptyFields.push('secretKey');
        }

        if (emptyFields.length > 0) {
                return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
        }

        // add trade to binance API to db
        try {
                const userId = req.user._id;

                const apiInfo = await Api.find({ userId });
                // Check to see if api already exists
                if (apiInfo.length > 0) {
                        return res.status(400).json({ error: 'Binance API already registered.' });
                }

                await Api.create({
                        userId,
                        apiKey,
                        secretKey,
                });
                res.status(200).json({ message: 'Successfully registered Binance API' });
        } catch (error) {
                res.status(400).json({ error: error.message });
        }
};

const getHistory = async (req, res) => {
        // call binance api to obtain history
        try {
                const userId = req.user._id;
                const tradeHistory = await History.find({ userId });

                res.status(200).json({ status: 'success' });
        } catch (error) {
                res.status(400).json({ error: error.message });
        }
};

const updateHistory = async (req, res) => {
        // call binance api to obtain history
        try {
                const userId = req.user._id;
                const apiInfo = await Api.find({ userId });

                if (apiInfo.length < 1) {
                        return res.status(404).json({ error: 'This user has no Binance API Registered' });
                }

                const binance = new Binance().options({
                        APIKEY: apiInfo[0].apiKey,
                        APISECRET: apiInfo[0].secretKey,
                });

                binance.trades('BTCBUSD', (error, trades, symbol) => {
                        // eslint-disable-next-line no-console
                        console.info(`${symbol} trade history`, trades);
                });
                // eslint-disable-next-line no-console
                console.log(test);

                res.status(200).json({ status: 'success' });
        } catch (error) {
                res.status(400).json({ error: error.message });
        }
};

module.exports = {
        addApi,
        getHistory,
        updateHistory,
};
