const Binance = require('../node_modules/node-binance-api');
const Api = require('../models/userKeyModel');
const History = require('../models/binanceSpotModel');

// add Binance api
const addSecretKey = async (req, res) => {
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

// Get all Binance trade history from saved on MongoDB for current authenticated user
const getTrades = async (req, res) => {
        try {
                const userId = req.user._id;
                const tradeHistory = await History.find({ userId }).sort({ createdAt: -1 });

                if (!tradeHistory) {
                        return res.status(404).json({ error: 'No Trade History' });
                }

                res.status(200).json({ status: 'success' });
        } catch (error) {
                res.status(400).json({ error: error.message });
        }
};

const updateTrades = async (req, res) => {
        const userId = req.user._id;

        // call binance api to obtain history
        try {
                const apiInfo = await Api.find({ userId });

                if (apiInfo.length < 1) {
                        return res.status(404).json({ error: 'This user has no Binance API Registered' });
                }

                const binance = new Binance().options({
                        APIKEY: apiInfo[0].apiKey,
                        APISECRET: apiInfo[0].secretKey,
                });
                binance.trades('BTCBUSD', async (error, trades) => {
                        // eslint-disable-next-line no-console
                        console.log(error);

                        if (error !== null) {
                                return res.status(400).json({ error: 'Invalid trade pair or missing pair' });
                        }

                        let count = 0;

                        // Loop through the trades array provided by binance api
                        for (let i = 0; i < trades.length; i += 1) {
                                // Deconstructg all the key value
                                const {
                                        symbol,
                                        id,
                                        orderId,
                                        orderListId,
                                        price,
                                        qty,
                                        quoteQty,
                                        commission,
                                        commissionAsset,
                                        time,
                                        isBuyer,
                                        isMaker,
                                        isBestMatch,
                                } = trades[i];

                                const tradeExist = await History.exists({ tradeId: id });

                                // If entry id exist continue
                                if (!tradeExist) {
                                        // Naming conflict
                                        const tradeId = id;

                                        History.create({
                                                symbol,
                                                tradeId,
                                                orderId,
                                                orderListId,
                                                price,
                                                qty,
                                                quoteQty,
                                                commission,
                                                commissionAsset,
                                                time,
                                                isBuyer,
                                                isMaker,
                                                isBestMatch,
                                                userId,
                                        });

                                        // Keep count of new trades added
                                        count += 1;
                                }
                        }
                        res.status(200).json({ status: 'success', newTrades: `new trades added ${count}` });
                });
        } catch (error) {
                res.status(400).json({ error: error.message });
        }
};

// Get post trade history from specific pair
const updateSpecificPair = async (req, res) => {
        const userId = req.user._id;
        const { pair } = req.params;

        // call binance api to obtain history of specific pair
        try {
                const apiInfo = await Api.find({ userId });

                if (apiInfo.length < 1) {
                        return res.status(404).json({ error: 'This user has no Binance API Registered' });
                }

                const binance = new Binance().options({
                        APIKEY: apiInfo[0].apiKey,
                        APISECRET: apiInfo[0].secretKey,
                });

                await binance.trades(pair, (error, trades) => {
                        // Loop through the trades array provided by binance api
                        let count = 0;
                        trades.forEach(async (tradesBinance) => {
                                // Deconstructg all the key value
                                const {
                                        symbol,
                                        id,
                                        orderId,
                                        orderListId,
                                        price,
                                        qty,
                                        quoteQty,
                                        commission,
                                        commissionAsset,
                                        time,
                                        isBuyer,
                                        isMaker,
                                        isBestMatch,
                                } = tradesBinance;

                                const tradeExist = await History.exists({ tradeId: id });

                                // If entry id exist continue
                                if (tradeExist) {
                                        return;
                                }

                                // Keep count of new trades added
                                count += 1;

                                // Naming conflict
                                const tradeId = id;

                                await History.create({
                                        symbol,
                                        tradeId,
                                        orderId,
                                        orderListId,
                                        price,
                                        qty,
                                        quoteQty,
                                        commission,
                                        commissionAsset,
                                        time,
                                        isBuyer,
                                        isMaker,
                                        isBestMatch,
                                        userId,
                                });
                        });

                        res.status(200).json({ status: 'success', newTrades: `new trades added ${count}` });
                });
        } catch (error) {
                res.status(400).json({ error: error.message });
        }
};

// Get specific trade associated with ID - Not started yet
const getTrade = async (req, res) => {
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

                let result;

                await binance.trades('BTCBUSD', (error, trades, symbol) => {
                        // eslint-disable-next-line no-console
                        // console.info(`${symbol} trade history`, trades);
                        // eslint-disable-next-line no-console
                        console.info(trades);
                });
                // eslint-disable-next-line no-console
                console.log(result);

                res.status(200).json({ result });
        } catch (error) {
                res.status(400).json({ error: error.message });
        }
};

module.exports = {
        addSecretKey,
        getTrades,
        updateTrades,
        updateSpecificPair,
        getTrade,
};
