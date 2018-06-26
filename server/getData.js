'use strict';
const request = require('request');
const parser = require('./parser');
const server = require('../app');
let info;

function get(path, pib, prior, callback) {

    request(path, function (err, res, body) {
        if (err) throw err;

        if (res.statusCode) {
            info = parser.parse(body);
            callback(pib, prior, info);
        }

    });
}

module.exports.getData = get ;





