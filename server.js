var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

var app = express();

app.use(serveStatic(path.join(__dirname, 'public'), {
  maxAge: '1d',
  setHeaders: setCustomCacheControl
}));


app.listen(3000, "127.0.0.1", function () {
  console.log('Example app listening on port 3000!');
});

function setCustomCacheControl (res, path) {
  if (serveStatic.mime.lookup(path) === 'text/html') {
    // Custom Cache-Control for HTML files
    res.setHeader('Cache-Control', 'public, max-age=0');
  }
  if (serveStatic.mime.lookup(path) === 'application/xml') {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
}
