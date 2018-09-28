const http = require('http')
const fs = require('fs')
const PORT = 8080;

let server = http.createServer(function (req, res) {
  let url = req.url;
  if (url === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.write(fs.readFileSync('./views/index.html'));
  } else if (/^\/static\//.test(url)) { // 判断是否是静态资源请求(以"/static/"开头的请求)
    // console.log('静态资源请求');
    let type = url.slice(url.lastIndexOf('.') + 1);
    if (type === 'js') {
      type = 'javascript; charset=utf-8'
    };
    let path = '.' + url;
    if (fs.existsSync(path)) {
      res.writeHead(200, {
        'Content-Type': `text/${type}`
      });
      res.write(fs.readFileSync(path));
    } else { // 如果没有该文件，返回404
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('Not Found 404!');
    }
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    res.write('Not Found 404!');
  }
  res.end();
});

server.listen(PORT, () => {
  console.log(`服务运行在 ${PORT}`)
});