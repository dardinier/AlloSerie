const config = require('./config');
const express = require('express');
const fs = require('fs');
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
        return;
    }

    /* Test if there is only 3 attributes */
    const keys = Object.keys(body);
    if (keys.length != 3) {
        res.status(400).end();
        return;
    }

    /* Generate a random UID */
    body.id = uuidv4();

    /* Construct the URL of the file */
    const file = config.data + "/episode." + body.id + ".json";

    /* Write the file according the body */
    jsonfile.writeFile(file, body, {spaces: 2, EOL: '\r\n'}, function () {
        res.status(400).end();
    });

    /* Send the created episode */
    res.status(201);
    res.send(body);
});

/**
 * Get all episodes
 */
router.get('/', function(req, res) {

    /* Get all files names from data directory */
    let episodesFiles = fs.readdirSync(config.data);

    /* Put all episodes in an array */
    let episodes = [];
    episodesFiles.forEach(episodeFile => {
        episodes.push(jsonfile.readFileSync(config.data + "/" + episodeFile));
    }, episodes);

    /* Send the episodes */
    res.status(200);
    res.send(episodes);
});

/**
 * Get an episode
 */
router.get('/:id', function(req, res) {

    /* Get all files names from data directory */
    let episodesFiles = fs.readdirSync(config.data);

    /* Get the episode */
    let episode = null;
    episodesFiles.forEach(episodeFile => {
        if(episodeFile == "episode." + req.params.id + ".json") {
            episode = jsonfile.readFileSync(config.data + "/" + episodeFile);
        }
    }, episode);

    /* If the episode if not found, throw an error */
    if(episode == null) {
        res.status(404).end();
    }

    /* Send the episode */
    res.status(200);
    res.send(episode);
});

/**
 * Delete an episode
 */
router.delete('/:id', function(req, res) {

    /* Get all files names from data directory */
    let episodesFiles = fs.readdirSync(config.data);

    /* Delete the episode */
    episodesFiles.forEach(episodeFile => {
        if(episodeFile == "episode." + req.params.id + ".json") {
            let returnCode = fs.unlinkSync(config.data + "/" + episodeFile);
            if(returnCode == undefined) {
                res.status(204).end();
            }
            else {
                res.status(400).end();
            }
        }
    });
    /* If no episode matchs, send an error */
    res.status(404).end();
});

/**
 * Update an episode
 */
router.put('/:id', function(req, res) {
    let body = req.body;
    let episodesFiles = fs.readdirSync(config.data);
    let episode = null;
    let file = null;

    /* Get the episode */
    episodesFiles.forEach(episodeFile => {
        if(episodeFile == "episode." + req.params.id + ".json") {
            episode = jsonfile.readFileSync(config.data + "/" + episodeFile);
            file = config.data + "/" + episodeFile;
        }
    }, episode, file);

    /* If the episode is not found, send an error */
    if(episode == null) {
        res.status(404).end();
        return;
    }

    /* Update the name of the episode */
    if(body.name != null) {
        if (typeof body.name == "string") {
            episode.name = body.name;
        } else {
            res.status(400).end();
        }
    }

    /* Update the code of the episode */
    if(body.code != null) {
        if (typeof body.code == "string") {
            episode.code = body.code;
        } else {
            res.status(400).end();
        }
    }

    /* Update the score of the episode */
    if(body.score != null) {
        if (typeof body.score == "number") {
            episode.score = body.score;
        } else {
            res.status(400).end();
        }
    }

    /* Rewrite the episode */
    if(file != null) {
        jsonfile.writeFile(file, episode, {spaces: 2, EOL: '\r\n'}, function () {
            res.status(400).end();
        });
    }

    /* Send the updated episode */
    res.status(200);
    res.send(episode);
});

module.exports = router;
