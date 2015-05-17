// HELLO WORLD
function upperCaser(input) {
	return input.toUpperCase()
}
// HIGHER ORDER FUNCTIONS
function repeat(operation, num) {
	while(num-- > 0) {
		operation()
	}
}
function recursiveRepeat(operation, num) {
	if (num > 0) {
		operation()
		repeat(operation, num - 1)
	}
}
// MAP
function doubleAll(numbers) {
	return numbers.map(function double(value, index, array) {
		return 2 * value
	})
}
// FILTER
function getShortMessages (array) {
	return array.filter(function (item) {
		return item.message.length < 50
	}).map(function (item) {
		return item.message
	})
}
// EVERY SOME
function checkUsersValid(validUsers) {
	return function allUsersValid(suppliedUsers) {
		return suppliedUsers.every(function (suppliedItem) {
			return validUsers.some(function (validItem) {
				return suppliedItem.id === validItem.id
			})
		})
	}
}
// REDUCE
function countWords(inputWords) {
	return inputWords.reduce(function (previous, current) {
		previous[current] = (previous[current] || 0) + 1
		return previous
	}, {})
}
// RECURSION
function reduce(array, reduceFunction, initial) {
	return (function step(index, value) {
		if(index > array.length - 1) {
			return value;
		}
  		return step(index + 1, reduceFunction(value, array[index], index, array))
  	})(0, initial)
}
// CALL
function duckCount() {
	return Array.prototype.slice.call(arguments).filter(function (object) {
		return Object.prototype.hasOwnProperty.call(object, 'quack')
	}).length
}
// PARTIAL APPLICATION WITHOUT BIND
var slice = Array.prototype.slice
function logger(namespace) {
	return function () {
		console.log.apply(console, [namespace].concat(slice.call(arguments)))
    }
}
// PARTIAL APPLICATION WITH BIND

module.exports = logger