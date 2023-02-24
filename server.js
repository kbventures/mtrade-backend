const app = require('./app');

// const connectedPort = process.env.PORT || 4000;
// app.listen(process.env.PORT || 4000);

module.exports = app.listen(process.env.PORT || 4000);
