const http = require('http')
/* VERSION 1
var charCount = 0
var dataCount = 0
var allData = ''
http.get(process.argv[2], function(response) {
	response.setEncoding('utf8')
	response.on("data", function (data) {
		charCount += data.length
		dataCount++
		allData += data
	})
	response.on("error", function (error) {
		console.error('error... ' + error)
	})
	response.on("end", function (end) {
		console.log('char count... ' + charCount)
		console.log('data count... ' + dataCount)
		console.log('all data... ' + allData)
	})
}) */
const bl = require('bl')
/* VERSION 2
http.get(process.argv[2], function(response) {
	response.pipe(bl(function (error, data) {
		if (error) {
			return console.error(error)
		} else {
			console.log('char count... ' + data.length)
			console.log('all data... ' + data.toString())
		}
	}))
}) */
// VERSION 3
var urls = process.argv.slice(2)
var finished = 0
var received = []
function printData() {
	for (var i = 0; i < received.length; i++) {
		console.log('URL ' + urls[i] + ' (' + received[i].length + ' characters)... ')
	}
}
function getData(index) {
	http.get(urls[i], function(response) {
		response.pipe(bl(function (error, data) {
			if (error) {
				return console.error(error)
			}
			received[index] = data.toString();
			if (++finished == urls.length) {
				printData();
			}
		}))
	})
}
for (var i = 0; i < urls.length; i++) {
	getData(i)
}