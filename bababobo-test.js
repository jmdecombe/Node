const bababobo = require('./bababobo')
if (Object.getPrototypeOf(bababobo) === Object.prototype) {
	if (bababobo.hasOwnProperty('baba')) {
		bababobo.baba()
	}
	if (bababobo.hasOwnProperty('bobo')) {
		bababobo.bobo(3)
	}
} else {
	console.log('no bababobo')
}
const bababobonull = require('./bababobo-null')
if (Object.getPrototypeOf(bababobonull) === null) {
	if (Object.prototype.hasOwnProperty.call(bababobonull, 'baba')) {
		bababobonull.baba()
	}
	if (Object.prototype.hasOwnProperty.call(bababobonull, 'bobo')) {
		bababobonull.bobo(3)
	}
} else {
	console.log('no bababobo-null')
}