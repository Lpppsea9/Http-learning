const http = require('http')
const fs = require('fs')
const zlib = require('zlib')

http.createServer(function(req,res){
  console.log('request come', req.url);

  const html = fs.readFileSync('test.html')
  res.writeHead(200, {
    'Content-Type': 'text/html',
    // 'X-Content-Type-Options': 'nosniff' //不会主动预测返回的内容
    'Content-Encoding': 'gzip' //压缩了body，实际传输大小会有变化(变小)
  })
  res.end(zlib.gzipSync(html))

}).listen(8888)


console.log('server listening on 8888');