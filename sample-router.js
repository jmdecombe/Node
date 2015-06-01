const server = require('./sample-server.js')
server.route('GET', '/start', function (request, response) {
	server.reply(response, 200, '<p>START</p>')
})
server.route('GET', '/stop', function (request, response) {
	server.reply(response, 200, '<p>STOP</p>')
})
server.route('GET', '/echo', function (request, response) {
	const body = '<form method="POST">' +
		'<input type="text" name="message"/>' +
		'<input type="submit" value="echo"/>' +
		'</form>'
	server.reply(response, 200, body)
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