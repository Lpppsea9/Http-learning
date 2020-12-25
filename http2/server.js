const http = require('http')
const fs = require('fs')

http.createServer((request,response) => {
  console.log('request come', request.url);

  const html = fs.readFileSync('test.html', 'utf8')
  const img = fs.readFileSync('test.jpg')
  if(request.url === '/') {
    response.writeHead(200, {
      'Content-Type': 'text/html',
      'Connection': 'keep-alive',
      // Link是http2定义的 要推送可以定义哪些内容，下面推送test.jpg
      // 要推送的test.jpg(绝对路径); 指定它的类型; 需要进行一个服务端的推送
      'Link': '</test.jpg>; as=image; rel=preload'
    })
    response.end(html)
  } else {
    response.writeHead(200, {
      'Content-Type': 'image/jpg',
      'Connection': 'close'
    })
    response.end(img)
  }
})

console.log("listing");