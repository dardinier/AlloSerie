const express = require('express');
const episodesAPI = require('./episodesAPI.js');
const config = require('./config.js');

const app = express();

app.use('/api/episodes', episodesAPI);

app.listen(config.port, () => console.log(`Server started at localhost:${config.port}`));
