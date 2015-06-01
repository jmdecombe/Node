const fs = require('fs')
const http = require('http')
const path = require('path')
const url = require('url')
function onResponseReply(response, status, text) {
	response.writeHead(status, {'Content-Type':'text/html'})
	response.write('<html><head><title>')
	response.write(text)
	response.write('</title></head><body><p>')
	response.write(text)
	response.end('</p></body></html>')
}
function onResponseServe(response, file) {
	fs.createReadStream(path.join(__dirname, file)).pipe(response)
}

function onRequest(request, response) {
	const pathname = url.parse(request.url).pathname
	const handler = routes[request.method + pathname]
	if (typeof(handler) === 'function') {
		handler(request, response)
	} else {
		onResponseReply(response, 404, '404 Not Found')
	}
}
var routes = {}
exports.route = function (method, path, handler) {
	routes[method + path] = handler
}
exports.reply = onResponseReply
exports.serve = onResponseServe
exports.start = function () {
	http.createServer(onRequest).listen(9999)
}