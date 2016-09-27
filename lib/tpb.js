var PirateBay = require('thepiratebay');
var chalk     = require('chalk');

module.exports = {

    search: function(name, subs_lang, cb){ 

	    console.log(chalk.green("Searching torrents: " + name));

        PirateBay.search(name, {category:200})
        .then(function(results){
            return cb(null, results, subs_lang);
        });

    }

}    


