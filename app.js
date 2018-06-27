/* eslint-disable no-unused-vars */
'use strict';
const request = require('request-promise');
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/server', (req, res) => {
  const path = req.query.path;
  request({ method: 'GET', uri: path }).then(data => {
    res.end(data);
  }).catch(err => {
    throw err;
  });
});

app.listen(8080);
