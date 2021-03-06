module.exports = function(dirPath, fileExt, printList) {
	const fs = require('fs')
	fs.readdir(dirPath, function (error, list) {
		if (error) {
			return printList('ERROR READING DIRECTORY')
		} else {
			const path = require('path')
			var ext = '.' + fileExt
			printList(null, list.filter(function (filePath) {
				return (path.extname(filePath) == ext)
			}))
		}
	});
};