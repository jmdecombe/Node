const http = require('http')
var charCount = 0
var dataCount = 0
var allData = ''
/*
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
})
*/
const bl = require('bl')
http.get(process.argv[2], function(response) {
	response.pipe(bl(function (error, data) {
		console.log('char count... ' + data.length)
		console.log('all data... ' + data.toString())
	}))
})