// verify with telnet localhost <port>
const net = require('net')
function pad(n) {
	return n < 10 ? '0' + n : n
}
function now() {
	var date = new Date()
	return date.getFullYear() + '-'
		+ pad(date.getMonth() + 1) + '-'
		+ pad(date.getDate()) + ' '
		+ pad(date.getHours()) + ':'
		+ pad(date.getMinutes())

}
var server = net.createServer(function(socket) {
	socket.end(now() + '\n') // alternately, require strftime and call socket.end(strftime('%Y-%m-%d %H:%M\n'))
})
server.listen(process.argv[2])