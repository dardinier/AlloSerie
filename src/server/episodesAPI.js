var express = require('express');
var router = express.Router();
const uuidv4 = require('uuid/v4');

router.post('/', function(req, res) {
    let body = req.body;

    if (typeof body.name !== "string" || typeof body.code !== "string" || typeof body.score !== "number") {
        res.status(400).end();
    }

    /* Generate a random UID */
    body.id = uuidv4();

    /** TO-DO
     * Create the file of the episode
     */

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
