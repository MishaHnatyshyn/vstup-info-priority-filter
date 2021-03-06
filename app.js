/* eslint-disable no-unused-vars,linebreak-style */
'use strict';
const get = require('./server/getData');
const parserVstupInfo = require('./server/parser');
const parserOsvita = require('./server/parserOSVITAVSTUP');
const express = require('express');
const func = require('./server/functions');
const app = express();

app.use(express.static('public'));

app.get('/server', (req, res) => {
  const path = req.query.path;
  const pib = req.query.pib;
  const parser = path.indexOf('osvita') > 0 ? parserOsvita : parserVstupInfo;
  const prior = req.query.prior;
  const request = get.getData(path);
  request.then(data => {
    const info = parser.parse(data, pib);
    const answer = func.getRateByPriority(info, pib, prior);
    func.log(path, pib, prior, answer, false);
    res.end(JSON.stringify({ result: answer, error: false }));
  }).catch(err => {
    func.log(path, pib, prior, null, err);
    res.end(JSON.stringify({ result: null, error: true }));
  });
});

app.listen(8080);
