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
		}
		console.log('char count... ' + data.length)
		console.log('all data... ' + data.toString())
	}))
}) */
// VERSION 3
var urls = process.argv.slice(2)
var count = 0
var contents = []
function printContents() {
	for (var i = 0; i < contents.length; i++) {
		console.log('URL ' + urls[i] + ' (' + contents[i].length + ' characters)... ')
	}
}
function getContents(index) {
	http.get(urls[index], function(response) {
		response.pipe(bl(function (error, data) {
			if (error) {
				return console.error(error)
			}
			contents[index] = data.toString();
			if (++count == urls.length) {
				printContents();
			}
		}))
	})
}
for (var i = 0; i < urls.length; i++) {
	getContents(i)
}