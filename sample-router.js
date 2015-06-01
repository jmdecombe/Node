const server = require('./sample-server.js')
server.route('GET', '/start', function (request, response) {
	server.reply(response, 200, 'START')
})
server.route('GET', '/stop', function (request, response) {
	server.reply(response, 200, 'STOP')
})
server.route('GET', '/echo', function (request, response) {
	server.serve(response, 'echo.html')
})
server.route('POST', '/echo', function (request, response) {
	var incoming = ''
	request.on('data', function (chunk) {
		incoming += chunk.toString()
	})
	request.on('end', function () {
		server.reply(response, 200, incoming)
	})
})
server.start()