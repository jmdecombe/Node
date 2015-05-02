const http = require('http')
const map = require('through2-map')
var server = http.createServer(function(request, response) {
	if (request.method != 'POST') {
        return response.end('Please use POST only.\n')
	}
	request.pipe(map(function (chunk) {
		return chunk.toString().toUpperCase()
	})).pipe(response)
})
server.listen(Number(process.argv[2]))