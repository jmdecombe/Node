const http = require('http')
const url = require('url')
var server = http.createServer(function (request, response) {
	if (request.method != 'GET') {
        return response.end('Please use GET only.\n')
	}
	var parse = url.parse(request.url, true)
	var date = new Date(parse.query.iso)
	if (parse.pathname == '/api/parsetime') {
		// /api/parsetime?iso=2013-08-10T12:10:15.474Z
		response.writeHead(200, {'content-type':'text/plain'})
		var parsetime = {
			hour:date.getHours(),
			minute:date.getMinutes(),
			second:date.getSeconds()
		}
		response.end(JSON.stringify(parsetime))
	} else if (parse.pathname == '/api/unixtime') {
		// /api/unixtime?iso=2013-08-10T12:10:15.474Z
		response.writeHead(200, {'content-type':'text/plain'})
		var unixtime = {
			unixtime:date.getTime()
		}
		response.end(JSON.stringify(unixtime))
	} else {
		response.writeHead(404)
		res.end()	
	}
})
server.listen(Number(process.argv[2]))