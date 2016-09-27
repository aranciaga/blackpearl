var peerflix = require('peerflix')
    spawn    = require('cross-spawn')
    path     = require('path').resolve(__dirname)

module.exports =  {

	startStreaming: function(sub, option, cb){
		
        if(sub){
			peerflix = spawn(path + '/../node_modules/.bin/peerflix', 
				       [option.magnetLink, '-t', sub, '--mplayer'], { stdio: 'inherit' });
		} else {
			peerflix = spawn(path + '/../node_modules/.bin/peerflix', 
				       [option.magnetLink, '--mplayer'], { stdio: 'inherit' });
		}

		peerflix.on('close', (code, signal) => {
			process.exit(); 
		}); 

	}


} 
