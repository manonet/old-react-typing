var express = require('express');
var app = express();
var config = require('./config');

app.set('port', (process.env.PORT || config.port));

app.use(express.static(__dirname + '/app'));
app.use("/public", express.static(__dirname + "/public"));

app.get('/', function(request, response) {
  response.render('app/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


