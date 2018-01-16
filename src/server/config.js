const path = require('path');

const config = {
    port: process.env.PORT || 3000,
    static: process.env.STATIC || path.join(__dirname, '/../../build'),
    data: process.env.DATA || path.join(__dirname, '/../../data')
};

module.exports = config;
