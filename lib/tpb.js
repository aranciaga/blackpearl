var pirata    = require('pirata');
var chalk     = require('chalk');

module.exports = {

    search: function(name, subs_lang, cb){ 

	    console.log(chalk.green("Searching torrents: " + name));

        pirata.search(name, { cat:200 }, function(results){
            return cb(null, results, subs_lang);
        });

    }

}    


