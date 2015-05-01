if (process.argv.length == 4) {
	var filterDirectory = require('./FilterDirectory');
	filterDirectory(process.argv[2], process.argv[3], function(error, list) {
		if (error) {
			return console.log(error);
		} else {
			for (var i = 0; i < list.length; i++) {
				console.log(list[i]);
			}
		}
	});
}