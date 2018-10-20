var Download = require('download');
var OS       = require("opensubtitles-api");
var os       = require('os');
var chalk    = require('chalk');
var opensub  = new OS('Popcorn Time v1');  // Thanks Popcorn!

module.exports = {

	searchSub: function(option, lang, cb){
    
		if(lang) {
			
			opensub.search({ query: option.name, sublanguageid: lang }).then(function(sub){

				if(!sub[Object.keys(sub)]){
					console.log( chalk.red("✖ Subtitles not found: You can add them manually.") )
					return cb(null, null, option); 
				} else {                    
                    console.log( chalk.green("✔ Subtitles found") );
					return cb(null, sub[Object.keys(sub)].url, option);
				}			

			});	

		} else {
        	return cb(null, null, option);
        }	
	
	},

	downloadSub: function(subs, option, cb){

		if(subs){

			var sub_file = os.tmpdir() + "/" + subs.substring( subs.lastIndexOf('/') + 1 ) 

		 	new Download({mode: '755'})
			    .get(subs)
			    .dest(os.tmpdir())
			    .run(function(err, files){
			    	console.log( chalk.green("✔ Subtitles downloaded") )
			        return cb(null, sub_file, option);
                });	

		} else {
            return cb(null, null, option); 
        }
		
	}

} 
