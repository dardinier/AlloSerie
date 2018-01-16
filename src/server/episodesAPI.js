const config = require('./config');
const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const jsonfile = require('jsonfile');

/**
 * Create an episode
 */
router.post('/', function(req, res) {
    let body = req.body;

    /* Test if parameters are well setted */
    if (typeof body.name !== "string" || typeof body.code !== "string" || typeof body.score !== "number") {
        res.status(400).end();
    }

    /* Generate a random UID */
    body.id = uuidv4();

    /* Construct the URL of the file */
    const file = config.data + "/episode." + body.id + ".json";

    /* Write the file according the body */
    jsonfile.writeFile(file, body, function () {
        res.status(400).end();
    });

    res.status(201);
    res.send(body);
});

router.get('/', function(req, res) {
    res.send('List all episodes');
});

router.get('/:id', function(req, res) {
    res.send('Show an episode');
});

router.delete('/:id', function(req, res) {
    res.send('Delete an episode');
});

router.put('/:id', function(req, res) {
    res.send('Update an episode');
});

module.exports = router;
