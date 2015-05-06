var exec = require('child_process').exec;
var util = require('util');

var switchIt = function(plugLetter, switchChoice) {
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

module.exports.switchIt = switchIt;
