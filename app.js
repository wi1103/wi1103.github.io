var http = require('http');
var express = require("express");
var app     = express();
var path    = require("path");
app.use(express.static(__dirname + '/'));
var options = {
    root:'',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

app.get('/app', function(req, res) {
console.log("Running at Port 3000");

    res.sendFile(path.resolve('app/index.html'),options);
});

app.listen(3000);
