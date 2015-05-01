console.log(process.argv);
var alength = process.argv.length;
var filepath = process.argv[1];
if (alength > 2) {
	filepath = process.argv[2];
	if (alength > 3) {
		var sum = 0;
		for (var i = 3; i < alength; i++) {
			sum += Number(process.argv[i]);
		}
		console.log((alength - 3) + ' parameters totaling ' + sum);
	}
} else {
	console.log('no app parameters');
}
var fs = require('fs');
var buffer = fs.readFileSync(filepath);
var n = buffer.toString().split('\n').length - 1;
console.log(n + ' newline characters in ' + filepath + ' (synchronous)');
fs.readFile(filepath, function(err, data) {
	var n = data.toString().split('\n').length - 1;
	console.log(n + ' newline characters in ' + filepath + ' (asynchronous)');
});
var v = test();
console.log(v);
console.log(v.bar);
console.log(Math.round(v.bar));
console.log(v.bar.toString().replace('2', '7'));
console.log(v.xin[2]);
console.log(v['xin'][2]);
console.log(ndef());
console.log('four'.length);
var kiki = 'kiki, c\'est le kiki de tous les kikis';
console.log(kiki.replace('kiki', 'koko'));
var animals = ['cat', 'bird', 'dog', 'elephant', 'owl'];
console.log(animals.filter(function (animal) {
	return (animal.length == 3);
}));
for (var i = 0; i < animals.length; i++) {
	if (animals[i].length != 3) {
		animals[i] += 's';
	} else {
		animals[i] += ' alone';
	}
}
console.log(animals);
setTimeout(function() {
	console.log('2 seconds have elapsed.')
}, 2000);
(function() {
	console.log('just do it!');
})();
var http = require('http');
http.request({hostname: 'jmdecombe.com'}, function(res) {
	res.setEncoding('utf8');
	res.on('data', function(chunk) {
//		console.log(chunk);
	});
}).end();
var httpFile = require('./HTTPServer');
//httpFile.startHTTPServer();
function test() {
	var foo = {
		bar: 12.3,
		xin: [
			4,
			5,
			'6'
		],
		qux: true || false
	}
	return foo;
}
function ndef() {
}