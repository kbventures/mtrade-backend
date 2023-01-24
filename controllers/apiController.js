const Api = require('../models/apiModel.js');

// create a new trade

const createApi = async (req, res) => {
        const { apiKey, secretKey } = req.body;

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

        // add trade to db
        try {
                const userId = req.user._id;
                const api = await Api.create({
                        userId,
                        apiKey,
                        secretKey,
                });
                res.status(200).json(api);
        } catch (error) {
                res.status(400).json({ error: error.message });
        }
};

module.exports = {
        createApi,
};
