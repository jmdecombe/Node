/* MEET PIPE
const fs = require('fs')
fs.createReadStream(process.argv[2]).pipe(process.stdout)
*/
/* INPUT OUTPUT
process.stdin.pipe(process.stdout)
*/
/* TRANSFORM
const through2 = require('through2')
var transform = through2(function(buffer, _, next) {
	this.push(buffer.toString().toUpperCase())
	next()
})
process.stdin.pipe(transform).pipe(process.stdout)
*/
/* LINES
const split = require('split')
const through2 = require('through2')
var lineCount = 0
var transform = through2(function (buffer, _, next) {
    var line = buffer.toString()
    this.push(lineCount % 2 === 0 ? line.toLowerCase() + '\n' : line.toUpperCase() + '\n')
    lineCount++
    next()
})
process.stdin.pipe(split()).pipe(transform).pipe(process.stdout)
*/
/* CONCAT
process.stdin.pipe(require('concat-stream')(function (data) {
	console.log(data.toString().split('').reverse().join(''))
}))
*/
/* HTTP SERVER
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
server.listen(parseInt(process.argv[2]))
*/
/* HTTP CLIENT
const request = require('request')
var r = request.post('http://localhost:8099')
process.stdin.pipe(r).pipe(process.stdout)
*/
/* WEBSOCKETS - use browserify to compile then test in browser at http://localhost:8099
var ws = require('websocket-stream')
var stream = ws('ws://localhost:8099')
stream.write('hello\n')
*/
// HTML STREAM
var trumpet = require('trumpet')
var tr = trumpet()