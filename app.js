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

app.use(function(req, res, next){
   res.setHeader('Content-Type', 'text/plain');
   res.send(404, '404 Page Not Found');
}); 

// pi-aREST
var piREST = require('pi-arest')(app);

// Raspberry Pi name & ID
piREST.set_id('c3p0');
piREST.set_name('piscuit');

// Start server
var server = app.listen(8000, function() {
    console.log('Listening on port %d', server.address().port);
});
