var peerflix = require('peerflix')
    spawn    = require('cross-spawn')
    path     = require('path').resolve(__dirname)

module.exports =  {

	startStreaming: function(sub, option, cb){
		
        if(sub){
			peerflix = spawn(path + '/../node_modules/.bin/peerflix', 
				       [option.magnetLink, '-t', sub, '--vlc'], { stdio: 'inherit' });
		} else {
			peerflix = spawn(path + '/../node_modules/.bin/peerflix', 
				       [option.magnetLink, '--vlc'], { stdio: 'inherit' });
		}

		peerflix.on('close', (code, signal) => {
			process.exit(); 
		}); 

	}


} 
