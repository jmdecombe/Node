var http = require('http');
http.get(process.argv[2], function(response) {
	response.setEncoding('utf8');
	response.on("data", function (data) {
		console.log('data... ' + data);
	});
	response.on("error", function (error) {
		console.error('error... ' + error);
	});
	response.on("end", function (end) {
		console.log('end... ' + end);
	});
});