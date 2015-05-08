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
/* HTML STREAM
const trumpet = require('trumpet')
const through = require('through2')
var tr = trumpet()
var loud = tr.select('.loud').createStream()
loud.pipe(through(function (buf, _, next) {
	this.push(buf.toString().toUpperCase())
	next()
})).pipe(loud)
process.stdin.pipe(tr).pipe(process.stdout)
*/
/* DUPLEXER
var spawn = require('child_process').spawn
const duplexer = require('duplexer2')
module.exports = function (cmd, args) {
	var ps = spawn(cmd, args)
	return duplexer(ps.stdin, ps.stdout)
}
*/
/* DUPLEXER REDUX
const duplexer = require('duplexer2')
const through = require('through2').obj
module.exports = function (counter) {
	var counts = {}
	var input = through(write, end)
	return duplexer(input, counter)
	function write (row, _, next) {
		counts[row.country] = (counts[row.country] || 0) + 1
		next()
	}
	function end (done) {
		counter.setCounts(counts)
		done()
	}
}
*/
/* COMBINER
const combine = require('stream-combiner')
const through = require('through2')
const split = require('split')
const zlib = require('zlib')
module.exports = function () {
	var grouper = through(write, end)
	var current
	function write (line, _, next) {
		if (line.length === 0) {
			return next()
		}
		var row = JSON.parse(line)
		if (row.type === 'genre') {
			if (current) {
				this.push(JSON.stringify(current) + '\n')
			}
			current = { name: row.name, books: [] }
		} else if (row.type === 'book') {
			current.books.push(row.name)
		}
		next()
	}
	function end (next) {
		if (current) {
			this.push(JSON.stringify(current) + '\n')
		}
		next()
	}
	return combine(split(), grouper, zlib.createGzip()
	)
}
*/
/* CRYPT
process.stdin.pipe(require('crypto').createDecipher('aes256', process.argv[2])).pipe(process.stdout)
*/
// SECRETZ
const tar = require('tar')
const crypto = require('crypto')
const zlib = require('zlib')
const concat = require('concat-stream')
var cipherName = process.argv[2]
var cipherPassphrase = process.argv[3]
var decipher = crypto.createDecipher(cipherName, cipherPassphrase)
var parser = tar.Parse()
parser.on('entry', function(e) {
	if (e.type !== 'File') {
		return
	}
	var h = crypto.createHash('md5', {encoding:'hex'})
	e.pipe(h).pipe(concat(function (hash) {
		console.log(hash + ' ' + e.path)
	}))
})
process.stdin.pipe(decipher).pipe(zlib.createGunzip()).pipe(parser)
