const http = require('http')
const fs = require('fs')

const wait = (seconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, seconds * 1000)
  })
}

http.createServer(function(request, response) {
  console.log('request come', request.headers.host);

  if(request.url === '/') {
    const html = fs.readFileSync('test.html', 'utf8')
    response.writeHead(200, {
      'Content-Type': 'text/html'
    })
    response.end(html)
  }

  if(request.url === '/data') {
    response.writeHead(200, {
      //代理缓存会使用s-maxage，浏览器缓存只是用max-age
      //private是浏览器能缓存，而代理服务器不能缓存
      //no-store是都不缓存
      'Cache-Control': 's-maxage=20',
      'Vary': 'X-Test-Cache'
    })
    wait(2).then(() => response.end('successs'))
  }
}).listen(8888)

console.log("listening on 8888");

/* 
  头信息:Vary和url:/data一样，才会使用缓存
  使用场景：
    比如使用了服务器缓存，但是需要返回的数据会根据user-agent不一样
    因为在PC端 和 移动端可能我们需要拿到的数据是不一样的，那这个时候
    我们就可以在Vary里去声明： 
      我们要判断user-agent一样的情况下，才会使用同一份缓存
      那么如果不一样，那他们两个是分别两个缓存
  所以这就是 Vary 这个头带给我们的作用

*/