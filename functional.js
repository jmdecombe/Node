// HELLO WORLD
function upperCaser(input) {
	return input.toUpperCase()
}
// HIGHER ORDER FUNCTIONS
function proceduralRepeat(operation, num) {
	while(num-- > 0) {
		operation()
	}
}
function recursiveRepeat(operation, num) {
	if (num > 0) {
		operation()
		recursiveRepeat(operation, num - 1)
	}
}
// MAP
function doubleAll(numbers) {
	return numbers.map(function double(value, index, array) {
		return 2 * value
	})
}
// FILTER
function getShortMessages(array) {
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
function applyLogger(namespace) {
	return function () {
		console.log.apply(console, [namespace].concat(slice.call(arguments)))
	}
}
// PARTIAL APPLICATION WITH BIND
function bindLogger(namespace) {
	return console.log.bind(console, namespace)
}
// MAP WITH REDUCE
function mapWithReduce(input, operation) {
	return input.reduce(function (previous, current, index, array) {
		return previous.concat(operation.call(null, current, index, array))
	}, [])
}
// FUNCTION SPY
function spy(target, method) {
	var result = {count:0}
	var fn = target[method]
	target[method] = function () {
		result.count++
		return fn.apply(this, arguments)
	}
	return result;
}
// BLOCKING EVENT LOOP
function repeatWithoutBlocking(operation, num) {
	if (num <= 0) {
		return
	}
	operation()
	if (num % 10 === 0) {
		setTimeout(function () {
			repeatWithoutBlocking(operation, --num)
		})
	} else {
		repeatWithoutBlocking(operation, --num)
	}
}
// TRAMPOLINE
function repeat(operation, num) {
	if (num <= 0) {
		return
	}
	return function () {
		operation()
		return repeat(operation, --num)
	}
}
function trampoline(fn) {
	while (fn && typeof fn === 'function') {
		fn = fn()
	}
}
function exportedTrampoline(operation, num) {
	trampoline(function () {
		return repeat(operation, num)
	})
}
// ASYNC LOOPS
function loadUsers(userIds, load, done) {
//	var users = []
//	for (var i = 0; i < userIds.length; i++) {
//		users.push(load(userIds[i]))
//	}
//	return users
	var users = []
	var count = 0
	userIds.forEach(function (id, index) {
		load(id, function (user) {
			users[index] = user
			if(++count === userIds.length) {
				return done(users)
			}
		})
	})
}
//RECURSION
function getDependencies(tree, result) {
	result = result || []
	var dependencies = tree && tree.dependencies || []
	Object.keys(dependencies).forEach(function (name) {
		var descriptor = name + "@" + dependencies[name].version
		if (result.indexOf(descriptor) === -1) {
			result.push(descriptor)
			getDependencies(dependencies[name], result)
		}
	})
	return result.sort()
}
// CURRYING

// FUNCTION CALL

// EXPORTS
module.exports = getDependencies