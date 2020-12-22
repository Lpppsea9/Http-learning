const http = require('http')
const fs = require('fs')

http.createServer(function(req,res){
  console.log('request come', res.url);

  //可以同步的把内容读取出来
  // const html = fs.readFileSync('test.html', 'utf8') 
  // res.writeHead(200, {
  //   'Content-Type': 'text/html'
  // })
  // res.end(html)

  if(req.url === '/') {
    const html = fs.readFileSync('test.html', 'utf8') 
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.end(html)
  }

  if(req.url === '/script.js') {
    console.log(req.headers);
    const etag = req.headers['if-none-match']
    if(etag === '777') {
      res.writeHead(304, {
        'Content-Type': 'text/javascript',
        'Cache-Control':'max-age=20000000, no-store',
        'Last-Modified' : '123',
        'Etag': '777'
      })
      res.end('1311')
    }else {
      res.writeHead(200, {
        'Content-Type': 'text/javascript',
        'Cache-Control':'max-age=20000000, no-store',
        'Last-Modified' : '123',
        'Etag': '777'
      })
      res.end('console.log("script loaded twice")')
    }
  }
}).listen(8888)


console.log('server listening on 8888');