/**
 * Created by sergeykrivtsov on 17/08/15.
 * @version 0.01
 * @contacts flashgangsta@gmail.com | https://bitbucket.org/flashgangsta/flashgangsta-js
 */

function Queue() {
	var instance = this;
	var methods = [];
	var args = [];

	this.push = function(method, argumentsRest) {
		var i;
		var argumentsRestList = [];

		methods.push(method);

		for(i = 1; i < arguments.length; i ++) {
			argumentsRestList.push(arguments[i]);
			trace(arguments[i]);
		}

		args.push(argumentsRestList);
	};

	this.applyFirst = function() {
		if (!methods.length) return;
		console.log("applyFirst");
		var method = methods.shift();
		console.log(method);
		method.apply(null, args.shift());
	};

	this.getLength = function() {
		return methods.length;
	};
}