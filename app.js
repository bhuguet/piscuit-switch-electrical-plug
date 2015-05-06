var basicAuth = require('basic-auth-connect');
var express = require("express");
var app     = express();

var exec = require('child_process').exec;
var util = require('util');

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

function switchPlug(plugLetter, switchChoice) {
	console.log(switchChoice);
	var plugNumber = 1;
	if ('d' === plugLetter) plugNumber = 4;
	var switchCommand = 0;
	if ('on' === switchChoice) switchCommand = 1; 

	exec(util.format('sudo /home/pi/tools_installed/433Utils/RPi_utils/send 11111 %d %d', plugNumber, switchCommand), {encoding: 'utf8'}, function(err, stdout) {
	        if (err) throw err;

	        console.log(stdout);
	});	
}

app.get('/switch/:plugletter/:switchchoice', function(req,res){
	switchPlug(req.params.plugletter, req.params.switchchoice);
});

// app.get('/about',function(req,res){
//   res.sendFile('/about.html');
// });

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
