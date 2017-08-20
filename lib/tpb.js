var pirata    = require('pirata');
var chalk     = require('chalk');

module.exports = {

	search: function(name, subs_lang, proxy_url, cb){ 

		console.log (chalk.green("Searching torrents: " + name) );

		pirata.search(name, { url: proxy_url, cat:200 }, function(err, results){

			if(err){
				console.log(chalk.red("Cannot fetch torrents from TPB"));
				process.exit();
			}

			return cb(null, results, subs_lang);

		});

	}

}    


