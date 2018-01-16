const express = require('express');
const api = require('./api.js');
const config = require('./config.js');

const app = express();
const PORT = 3000;

app.listen(PORT, () => console.log(`Server started at localhost:${PORT}`));
