var express = require('express');
var app = express();
var serialport = require('serialport');// include the library
SerialPort = serialport.SerialPort; // make a local instance of it

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});