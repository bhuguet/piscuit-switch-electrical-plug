var exec = require('child_process').exec;
var util = require('util');

var plugIndexes = { "a" : 1, "b" : 2, "c" : 3, "d" : 4 };
var commandsIndexes = { "on" : 1, "off" : 0 };

// Pi plug class
var pi-plug = {
  433UtilsPath: '/'
}

var Plug = function(letter, choice) {  
  this.letter = letter;
  this.choice = choice;

  this.getPlugNumber = function () {
    return plugIndexes[this.letter];
  }

  this.getSwitchCommand = function () {
    return commandsIndexes[this.choice];
  }

  this.toString = function () {
    return util.format('Plug %s, switch it %s', this.letter, this.choice);
  }

};

var switchIt = function(plugLetter, switchChoice) {
	var plug = new Plug(plugLetter, switchChoice);
	console.log(plug.toString());

  exec(
    util.format('sudo ' + pi-plug.433UtilsPath + '/send %s %d %d', 
      pi-plug.code, 
      plug.getPlugNumber(), 
      plug.getSwitchCommand()), 
    {encoding: 'utf8'}, function(err, stdout) {
      if (err) throw err;
      console.log(stdout);
    });
}

module.exports.switchIt = switchIt;

module.exports = function(app) {
	// Switch On/Off dynamic routes
	app.get('/switch/:plugletter/:switchchoice', function(req,res){
        	switchIt(req.params.plugletter, req.params.switchchoice);
	});
}
