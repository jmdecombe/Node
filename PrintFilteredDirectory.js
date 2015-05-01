if (process.argv.length == 4) {
	var filterDirectory = require('./FilterDirectory');
	filterDirectory(process.argv[2], process.argv[3], function(error, list) {
		if (error) {
			return console.log(error);
		} else {
			list.forEach(function(file) {
				console.log(file);
			});
		}
	});
}