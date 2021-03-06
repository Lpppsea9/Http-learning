const http = require('http')
const fs = require('fs')

http.createServer(function(req,res){
  // console.log('request come', req.url);

  const host = req.headers.host //拿到host
  console.log(host);

  if(req.url === '/') {
    const html = fs.readFileSync('test.html', 'utf8') 
    if (host === 'a.test.com:8888'){ //满足条件写cookie
      res.writeHead(200, {
        'Content-Type': 'text/html',
        'Set-Cookie': ['id=123; max-age=2', 'abc=456']
      }) 
    }
    res.end(html)
  }

}).listen(8888)


console.log('server listening on 8888');