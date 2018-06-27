'use strict';

const http = require('http');
const url = require('url');
const fs = require('fs');
const func = require('./server/functions');
const get = require('./server/getData');
const stat = require('node-static');
const parser = require('./server/parser');
const fileServer = new stat.Server( './public', {
    cache: 3600,
    gzip: true
} );

const server = (req, res)=>{
    
    const data = url.parse(req.url, true).query;
    if (data.path){
        let path = data.path;
        const pib = data.pib;
        const prior = data.prior;
        const request = get.getData(path);

        request.then(data=>{
                const info = parser.parse(data, pib);
                const answer = func.getRateByPriority(info, pib, prior);
                res.end(''+answer);
            })
            .catch(err=>{
                throw err;
            });

    }else {
        req.addListener( 'end', function () {
            fileServer.serve( req, res );
        } ).resume();
    }
};

http.createServer(server).listen(8080);

