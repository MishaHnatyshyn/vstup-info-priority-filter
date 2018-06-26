'use strict';

const http = require('http');
const url = require('url');
const fs = require('fs');
const func = require('./server/functions');
const get = require('./server/getData');
const stat = require('node-static');
const fileServer = new stat.Server( './public', {
    cache: 3600,
    gzip: true
} );

let info;
const server = (req, res)=>{
    
    const q = url.parse(req.url, true);
    const data = q.query;
    if (data.path){
        let path = data.path;
        const pib = data.pib;
        const prior = data.prior;
        get.getData(path,pib,prior, (pib,prior, info)=>{
            const answer = func.getRateByPriority(info, pib, prior);
            res.end(''+answer);
        });
    }else {
        req.addListener( 'end', function () {
            fileServer.serve( req, res );
        } ).resume();
    }
};

const runServer = http.createServer(server).listen(8080);

