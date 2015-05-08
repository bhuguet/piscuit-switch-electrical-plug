var exec = require('child_process').exec;
var util = require('util');

var plugIndexMatching = { "a" : 1, "b" : 2, "c" : 3, "d" : 4 };
var commandMatching = { "on" : 1, "off" : 0 };

// Pi plug class
var piplug = {
  pathTo433utils: '/',
  plugDetails: {}
}

var SwitchAction = function(plugLetter, swichChoice) {  
  this.plugLetter = plugLetter;
  this.switchChoice = switchChoice;

  this.getPlugNumber = function () {
    return plugIndexMatching[this.plugLetter];
  }

  this.getSwitchCommand = function () {
    return commandMatching[this.switchChoice];
  }

  this.toString = function () {
    return util.format('Plug %s, switch it %s', this.plugLetter, this.switchChoice);
  }

};

var switchIt = function(plugLetter, switchChoice) {
  var switchAction = new SwitchAction(plugLetter, switchChoice);
  console.log(switchAction.toString()); 
  console.log('path ' + piplug.pathTo433utils);
  
  exec(
    util.format('sudo ' + piplug.pathTo433utils + '/send %s %d %d', 
      piplug.plugDetails[plugLetter], 
      switchAction.getPlugNumber(), 
      switchAction.getSwitchCommand()), 
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

  return {
    set433UtilsPath: function(path) {
      piplug.pathTo433utils = path;
    },
    setPlugDetails: function(plugDetails) {
      piplug.plugDetails = plugDetails;
    }
  };
};