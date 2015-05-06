var basicAuth = require('basic-auth-connect');
var express = require("express");
var app     = express();

var exec = require('child_process').exec;

// View engine
app.set('view engine', 'jade');

// Authenticator
app.use(basicAuth('piUser', 'c3p0Fulguro.'));

//Store all HTML files in view folder.
app.use(express.static(__dirname + '/views'));
// Set public folder
app.use(express.static(__dirname + '/public'));

// pi-aREST
var piREST = require('pi-arest')(app);

// Raspberry Pi name & ID
piREST.set_id('c3p0');
piREST.set_name('piscuit');

// Interface routes
app.get('/interface', function(req, res){
  res.render('interface');
});


// app.get('/interface',function(req,res){
// 	res.sendFile(__dirname + 	'/views/index.html');
//   	//It will find and locate index.html from View or Scripts
// });

app.get('/switch-on',function(req,res){
	console.log('switch-on');

	exec('sudo /home/pi/tools_installed/433Utils/RPi_utils/send 11111 3 1', {encoding: 'utf8'}, function(err, stdout) {
	        if (err) throw err;

	        console.log(stdout);
	});

});

app.get('/switch-off',function(req,res){
	console.log('switch-off');

	exec('sudo /home/pi/tools_installed/433Utils/RPi_utils/send 11111 3 0', {encoding: 'utf8'}, function(err, stdout) {
	        if (err) throw err;

	        console.log(stdout);
	});

});

// app.get('/about',function(req,res){
//   res.sendFile('/about.html');
// });

// app.get('/sitemap',function(req,res){
//   res.sendFile('/sitemap.html');
// });

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
}); 

// Start server
var server = app.listen(8000, function() {
    console.log('Listening on port %d', server.address().port);
});
