var async    = require('async');
var stream   = require('./lib/stream.js');
var subs     = require('./lib/subs.js');
var tpb      = require('./lib/tpb.js');
var cli      = require('./lib/cli.js');
var fs       = require('fs');
var chalk    = require('chalk');
var action   = process.argv[2];
var name     = process.argv[3];
var actions  = ["search"];

var settings = {};

if (fs.existsSync(process.env['HOME']+'/.config/blackpearl/config')){
  settings = require(process.env['HOME']+'/.config/blackpearl/config');
}

var help_screen = function(){

	var path = require('path').resolve(__dirname);

	fs.readFile(path + '/' + 'logo.dat', 'utf8', function (err,data) {
	  	console.log(chalk.yellow(data));
		console.log(chalk.cyan("Usage: blackpearl search [name]"));
		console.log(chalk.red("Subtitles: --sub [spa,eng,fre,etc]"));
		console.log(chalk.red("Pirate bay proxy url: --url [https://pirateproxy.cam]"));
		process.exit(); 
	}); 
	
}

if( actions.indexOf(action) == -1){
	return help_screen();
}

if ( process.argv.indexOf("--sub") != -1 && process.argv[ process.argv.indexOf("--sub") + 1 ] ) {
	settings.subs_language = process.argv[ process.argv.indexOf("--sub") + 1 ];
}

if ( process.argv.indexOf("--url") != -1 && process.argv[ process.argv.indexOf("--url") + 1 ] ) {
	settings.url = process.argv[ process.argv.indexOf("--url") + 1 ];
}


async.waterfall([
    async.apply(tpb.search, name, settings.subs_language, settings.url),
    cli.showResults,
    cli.chooseResult,
    subs.searchSub,
    subs.downloadSub,
    stream.startStreaming
]);


