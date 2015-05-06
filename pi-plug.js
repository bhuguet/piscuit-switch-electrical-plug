var exec = require('child_process').exec;
var util = require('util');

var Plug = function(letter, choice) {
  this.code = '11111';
  this.letter = letter;
  this.choice = choice;

  this.getPlugNumber = function () {
    var plugNumber = 1;
    if ('d' === this.letter) plugNumber = 4;
    return plugNumber;
  }

  this.getSwitchCommand = function () {
    var switchCommand = 0;
    if ('on' === this.choice) switchCommand = 1;
    return switchCommand;
  }

  this.toString = function () {
    return util.format('Plug %s, switch it %s', this.letter, this.choice);
  }

};

var switchIt = function(plugLetter, switchChoice) {
	var plug = new Plug(plugLetter, switchChoice);
	console.log(plug.toString());

        exec(util.format('sudo /home/pi/tools_installed/433Utils/RPi_utils/send %s %d %d', plug.code, plug.getPlugNumber(), plug.getSwitchCommand()), {encoding: 'utf8'}, function(err, stdout) {
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
