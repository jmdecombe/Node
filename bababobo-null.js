const bababobonull = Object.create(null)
bababobonull.baba = function () {
	console.log('baba-null')
}
bababobonull.bobo = function (count) {
	for (var i = 0; i < count; i++) {
		console.log('bobo-null')
	}
}
module.exports = bababobonull