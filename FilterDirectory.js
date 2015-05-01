module.exports = function(dirPath, fileExt, printList) {
	var fs = require('fs');
	fs.readdir(dirPath, function(error, list) {
		if (error) {
			return printList('ERROR READING DIRECTORY');
		} else {
			var ext = '.' + fileExt;
			var path = require('path');
			printList(null, list.filter(function (filePath) {
				return (path.extname(filePath) == ext);
			}));
		}
	});
};