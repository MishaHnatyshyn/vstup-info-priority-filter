'use strict';
const request = require('request-promise');

function get(path) {
    const options = {
        method: 'GET',
        uri: path
    };
    return request(options)
}

module.exports.getData = get ;






