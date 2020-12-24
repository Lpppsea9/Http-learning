const http = require('http')

http.createServer(function(request,response){
  console.log('request come', request.url);

  if(request.url === '/') {
    response.writeHead(301, { //301表示永久跳转，302表示临时跳转
      'Location': '/new'
    })
    response.end()
  }

  if(request.url === '/new') {
    response.writeHead(200, {
      'Content-Type': 'text/html'
    })
    response.end('<div>this is content</div>')
  }
}).listen(8888)

console.log('server listening on 8888');