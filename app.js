var basicAuth = require('basic-auth-connect');
var express = require("express");
var app     = express();

// View engine
app.set('view engine', 'jade');

// Authenticator
app.use(basicAuth('piUser', 'c3p0Fulguro.'));

// Set public folder
app.use(express.static(__dirname + '/public'));

// Interface routes
app.get('/interface', function(req, res){
  res.render('interface');
});

// pi-plug
var piPlug = require('./pi-plug')(app);
piPlug.setPathTo433Utils('/home/pi/tools_installed/433Utils/RPi_utils');
piPlug.setPlugDetails({ "a" : 11111, "b" : 11111, "c" : 11111, "d" : 11111 });

// pi-aREST
var piREST = require('pi-arest')(app);

// Raspberry Pi name & ID
piREST.set_id('c3p0');
piREST.set_name('piscuit');

app.use(function(req, res, next){
   res.setHeader('Content-Type', 'text/plain');
   res.status(404).send('404 Page Not Found');
});

// Start server
var server = app.listen(8000, function() {
    console.log('Listening on port %d', server.address().port);
});
