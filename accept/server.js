const http = require('http')
const fs = require('fs')
const zlib = require('zlib')

http.createServer(function(req,res){
  console.log('request come', req.url);

  const html = fs.readFileSync('test.html')
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Encoding': 'gzip' //压缩了body
  })
  res.end(zlib.gzipSync(html))

}).listen(8888)


console.log('server listening on 8888');