const express = require('express');
const episodesAPI = require('./episodesAPI.js');
const logosAPI = require('./logosAPI.js');
const config = require('./config.js');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use('/api/episodes', episodesAPI);
app.use('/api/logos', logosAPI);

app.listen(config.port, () => console.log(`API server started at localhost:${config.port}`));
