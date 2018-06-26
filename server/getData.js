'use strict';
const request = require('request');
const parser = require('./parser');
const server = require('../app');
let result;

function get(path, pib, prior, callback) {

    request(path, function (err, res, body) {
        if (err) throw err;

        if (res.statusCode) {
            result = parser.parse(body);
            callback(pib, prior, result);
        }

    });
}

module.exports.getData = get ;





