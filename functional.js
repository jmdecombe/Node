/* HELLO WORLD
function upperCaser(input) {
	return input.toUpperCase()
}
module.exports = upperCaser
*/
/* HIGHER ORDER FUNCTIONS
function repeat(operation, num) {
	while(num-- > 0) {
		operation()
	}
//	if (num > 0) {
//		operation()
//		repeat(operation, num - 1)
//	}
}
module.exports = repeat
*/
/* MAP
module.exports = function doubleAll(numbers) {
	return numbers.map(function double(value, index, array) {
		return 2 * value
	})
}
*/
/* FILTER
module.exports = function getShortMessages (array) {
	return array.filter(function (item) {
		return item.message.length < 50
	}).map(function(item) {
		return item.message
	})
}
*/
/* EVERY SOME
module.exports = function checkUsersValid(validUsers) {
	return function allUsersValid(suppliedUsers) {
		return suppliedUsers.every(function(suppliedItem) {
			return validUsers.some(function(validItem) {
				return suppliedItem.id === validItem.id
			})
		})
	}
}
*/
/* REDUCE
module.exports = function countWords(inputWords) {
	return inputWords.reduce(function(previous, current) {
		previous[current] = (previous[current] || 0) + 1
		return previous
	}, {})
}
*/
// RECURSION
