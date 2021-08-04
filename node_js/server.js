const http = require('http');
const url = require('url');
const stringDecoder = require("string_decoder").StringDecoder;
const util = require ("util");
const formidable = require("formidable");

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(function(req, res){

    if(req.METHOD == 'GET'){

        console.log('Wow that worked?!?');

    }
    
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});