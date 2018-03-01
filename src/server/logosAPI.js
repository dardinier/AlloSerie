const express = require('express');
const router = express.Router();
const dal = require('./dal');
const uuidv4 = require('uuid/v4');

const LOGO_TYPE = "logo";

/**
 * Create a logo
 */
router.post('/', function(req, res) {

  let body = req.body;

  /* Test if parameters are well setted */
  if (typeof body.image64 !== "string") {
    res.status(400).end();
    return;
  }

  /* Generate the logo ID */
  body.id = uuidv4();

  /* Insert the new logo */
  dal.insert(body, LOGO_TYPE)
    .then((logo) => {
      res.status(201);
      res.send(logo);
    })
    .catch(() => {
      res.status(400).end();
    })
});

/**
 * Get all logos
 */
router.get('/', function(req, res) {
  dal.findAll(LOGO_TYPE)
    .then((logos) => {
      res.status(200);
      res.send(logos);
    })
    .catch(() => {
      res.status(404).end();
    });
});

/**
 * Get a logo
 */
router.get('/:id', function(req, res) {
  dal.findOne(req.params.id, LOGO_TYPE)
    .then((logo) => {
      res.status(200);
      res.send(logo);
    })
    .catch(() => {
      res.status(404).end();
    });
});

/**
 * Delete a logo
 */
router.delete('/:id', function(req, res) {
  dal.delete(req.params.id, LOGO_TYPE)
    .then(() => {
      res.status(204).end();
    })
    .catch(() => {
      res.status(404).end();
    });
});

/**
 * Update a logo
 */
router.put('/:id', function(req, res) {

  let body = req.body;

  dal.findOne(req.params.id, LOGO_TYPE)
    .then((logo) => {

      if(body.image64 != null) {
        if (typeof body.image64 === "string") {
          logo.image64 = body.image64;
        } else {
          res.status(400).end();
        }
      }

      dal.delete(req.params.id, LOGO_TYPE)
        .then(() => {
          dal.insert(logo, LOGO_TYPE)
            .then((logo) => {
              res.status(200);
              res.send(logo);
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
