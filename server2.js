const http = require('http')

http.createServer(function(req,res){
  console.log('request come',res.url);

  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*', //浏览器提供的跨域的方法
    'Access-Control-Allow-Headers': 'X-Test-Cors',
    'Access-Control-Allow-Methods':'POST, PUT, Delete',
    'Access-Control-Allow-Age': '1000' //代表
  })
  res.end('123')

}).listen(8887)

console.log('server listen on 8887');