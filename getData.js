'use strict';
const request = require('request');
const parser = require('./parser');
const server = require('./app');
let result;

function get(path,pib,prior) {
    let data;
    request(path, function (err, res, body) {
        if (err) throw err;

        if (res.statusCode) {
            result = parser.parse(body);
            module.exports.obj = result;
            server.answer(pib,prior);

        }

    });
}

module.exports.getData = get ;





