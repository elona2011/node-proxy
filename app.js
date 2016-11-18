// var http = require('http'),
//   httpProxy = require('http-proxy');
// //
// // Create your proxy server and set the target in the options.
// //
// httpProxy.createProxyServer({ target: 'http://localhost:9000' }).listen(8000); // See (†)

//
// Create your target server
//
// http.createServer(function (req, res) {
//   console.log(req)

//   http.request({
//     hostname: req.headers.host,
//     port: 80,
//     path: req.url,
//     method: req.method,
//     headers: req.headers
//   }, function (_req, _res) {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
//   })
//   res.end();
// }).listen(9000);

var http = require('http');
var net = require('net');
var url = require('url');

function connect(cReq, cSock) {
    var u = url.parse('http://' + cReq.url);

    var pSock = net.connect(u.port, u.hostname, function() {
        cSock.write('HTTP/1.1 200 Connection Established\r\n\r\n');
        pSock.pipe(cSock);
    }).on('error', function(e) {
        cSock.end();
    });

    cSock.pipe(pSock);
}

http.createServer().on('connect', connect).listen(8888, '0.0.0.0');