const express = require('express');
const Test = require('../models/Test');

const testRouter = express.Router();
const jsonBodyParser = express.json();

testRouter.route('/')
  .get((req, res, next) => {
    Test.find({})
      .then(tests => res.send(tests))
      .catch(next);
  })
  .post(jsonBodyParser, (req, res, next) => {
    const { title, content } = req.body;

    for(const field of ['title', 'content']) {
      if(!req.body[field]) {
        return res.status(400).json({
          error: `Missing ${field} in request body.`
        });
      }
    }

    const newTest = new Test({ title, content });

    newTest.save((err, doc) => {
      if(err) {
        res.status(401).json({ error: `Error ${err}` });
      } else {
        res.status(201).json(doc);
      }
    });
  });

testRouter.route('/:_id')
  .get((req, res, next) => {
    const _id = req.params._id;

    Test.findOne({ _id }, (err, doc) => {
      if(err) {
        return res.status(404).json({ error: `Not Found` });
      } else {
        return res.status(200).json(doc);
      }
    });
  })
  .patch(jsonBodyParser, (req, res, next) => {
    const _id = req.params._id;

    if (!_id) {
      return res.status(404).json({ error: `Not Found` });
    }

    const fieldsToUpdate = req.body;

    Test.findOneAndUpdate({ _id }, { ...fieldsToUpdate }, (err, doc) => {
      if(err) {
        return res.status(404).json({ error: `Not Found` });
      } else {
        res.status(204).json(doc);
      }
    });
  })
  .delete((req, res, next) => {
    const _id = req.params._id;

    if (!_id) {
      return res.status(404).json({ error: `Not Found` });
    }

    Test.findOneAndRemove({ _id }, (err, doc) => {
      if(err) {
        res.status(400).json({ error: `Error` });
      } else {
        res.status(204).json(doc);
      }
    });
  });

module.exports = testRouter;