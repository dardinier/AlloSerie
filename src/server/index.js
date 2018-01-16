const express = require('express');
const episodesAPI = require('./episodesAPI.js');
const config = require('./config.js');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use('/api/episodes', episodesAPI);

app.listen(config.port, () => console.log(`Server started at localhost:${config.port}`));
