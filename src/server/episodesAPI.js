const config = require('./config');
const express = require('express');
const router = express.Router();
const dal = require('./dal');

/**
 * Create an episode
 */
router.post('/', function(req, res) {

    let body = req.body;

    /* Test if parameters are well setted */
    if (typeof body.name !== "string" || typeof body.code !== "string" || typeof body.score !== "number") {
        res.status(400).end();
        return;
    }

    /* Insert the new episode */
    dal.insert(body)
        .then((episode) => {
            res.status(201);
            res.send(episode);
        })
        .catch(() => {
            res.status(400).end();
        })
});

/**
 * Get all episodes
 */
router.get('/', function(req, res) {
    dal.findAll()
        .then((episodes) => {
            res.status(200);
            res.send(episodes);
        })
        .catch(() => {
            res.status(404).end();
        });
});

/**
 * Get an episode
 */
router.get('/:id', function(req, res) {
    dal.findOne(req.params.id)
        .then((episode) => {
            res.status(200);
            res.send(episode);
        })
        .catch(() => {
            res.status(404).end();
        });
});

/**
 * Delete an episode
 */
router.delete('/:id', function(req, res) {
    dal.delete(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch(() => {
            res.status(404).end();
        });
});

/**
 * Update an episode
 */
router.put('/:id', function(req, res) {

    let body = req.body;

    dal.findOne(req.params.id)
        .then((episode) => {
            if(body.name != null) {
                if (typeof body.name == "string") {
                    episode.name = body.name;
                } else {
                    res.status(400).end();
                }
            }

            if(body.code != null) {
                if (typeof body.code == "string") {
                    episode.code = body.code;
                } else {
                    res.status(400).end();
                }
            }

            if(body.score != null) {
                if (typeof body.score == "number") {
                    episode.score = body.score;
                } else {
                    res.status(400).end();
                }
            }

            dal.delete(req.params.id)
                .then(() => {
                    dal.insert(episode)
                        .then((episode) => {
                            res.status(200);
                            res.send(episode);
                        })
                        .catch(() => {
                            res.status(400).end();
                        });
                })
                .catch(() => {
                    res.status(400).end();
                });
        })
        .catch(() => {
            res.status(404).end();
        });
});

module.exports = router;
