var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
    res.send('Create an episode');
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
