function onResponse(response, status, body) {
	response.writeHead(status, {'Content-Type':'text/html'})
	response.write('<html><head><title>ROUTER</title></head><body>')
	response.write(body)
	response.end('</body></html>')
}
function onRequest(request, response) {
	const pathname = require('url').parse(request.url).pathname
	const handler = routes[request.method + pathname]
	if (typeof(handler) === 'function') {
		handler(request, response)
	} else {
		onResponse(response, 404, '<p>404 Not Found</p>')
	}
}
var routes = {}
exports.route = function (method, path, handler) {
	routes[method + path] = handler
}
exports.reply = onResponse
exports.start = function () {
	require('http').createServer(onRequest).listen(9999)
}