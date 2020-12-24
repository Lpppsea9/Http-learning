const http = require('http')
const fs = require('fs')

http.createServer(function(request, response) {
  console.log('request come', request.url);

  if(request.url === '/'){
    const html = fs.readFileSync('test.html', 'utf8')
    response.writeHead(200, {
      'Content-Type': 'text/html',
      // \'self\'表示只能加载本站名下面的脚本
      // 'https://cdn.bootcdn.net' 允许域名下的脚本加载
      'Content-Security-Policy': ' default-src \'self\'; form-action \'self\'; report-uri /report'
    })
    response.end(html)
  } else { //引入外链接的js则会打印load script
    response.writeHead(200, {
      'Content-Type': 'application/javascript'
    })
    response.end('console.log("loaded script")')
  }
}).listen(8888)

console.log('server listening on 8888');