const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  
    let body = '';

    if(req.method === 'POST' && req.url === '/test')
	{

		console.log(req.method);
        console.log('RECEIVED SOMETHING!');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Sent Response');

	}

    
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});