const http = require('http')

http.createServer(function(request, response){
  console.log('request come', request.url);

  response.end('123')
}).listen(8888)

console.log('server listening on 8888');